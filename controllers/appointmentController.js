const Appointment = require("../models/appointmentModel");
const Notification = require("../models/notificationModel");
const User = require("../models/userModel");
const { sendEmailWithTemplate } = require("../middleware/mailer");

const getallappointments = async (req, res) => {
  try {
    const { search, date, page = 1, limit = 10 } = req.query;

    const keyword = search
      ? {
          $or: [{ userId: search }, { counsellorId: search }],
        }
      : {};

    let dateFilter = {};
    if (date) {
      dateFilter = { date };
    }

    // Combine the keyword and date filters
    const filters = [keyword, dateFilter].filter(
      (filter) => Object.keys(filter).length > 0
    );

    // Calculate the number of documents to skip based on the current page
    const skip = (page - 1) * limit;

    // Fetch appointments based on the combined filter, with pagination
    const appointments = await Appointment.find({ $and: filters })
      .populate("counsellorId")
      .populate("userId")
      .skip(skip)
      .limit(parseInt(limit));

    // Count total appointments that match the filters (without pagination)
    const totalAppointments = await Appointment.countDocuments({
      $and: filters,
    });

    // Return the appointments along with pagination data
    return res.send({
      totalRows: totalAppointments,
      totalPages: Math.ceil(totalAppointments / limit),
      currentPage: parseInt(page),
      data: appointments,
    });
  } catch (error) {
    res.status(500).send("Unable to get appointments");
  }
};

const getupcomingappointments = async (req, res) => {
  try {
    const { search } = req.query;

    const keyword = search
      ? {
          $or: [{ userId: search }, { counsellorId: search }],
        }
      : {};

    // Get today's date
    const currentDate = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'

    // Filter for appointments from today onwards
    const dateFilter = {
      date: { $gte: currentDate },
    };

    // Filter for "pending" status
    const statusFilter = { status: "Pending" };

    // Combine the keyword, date, and status filters
    const filters = [keyword, dateFilter, statusFilter].filter(
      (filter) => Object.keys(filter).length > 0
    );

    // Fetch 5 upcoming "pending" appointments starting from today
    const appointments = await Appointment.find({ $and: filters })
      .populate("counsellorId")
      .populate("userId")
      .sort({ date: 1 }) // Sort by date in ascending order (soonest first)
      .limit(5); // Limit the result to 5 appointments

    // Return the upcoming appointments (no pagination)
    return res.send({
      totalRows: appointments.length,
      data: appointments,
    });
  } catch (error) {
    console.error("Error fetching upcoming appointments:", error);
    res.status(500).send("Unable to get upcoming appointments");
  }
};


const getTotalBookingsOverTime = async (req, res) => {
  try {
    // Destructure the time interval (e.g., daily, monthly) from query parameters
    const { interval = "monthly" } = req.query;

    const matchStage = {
      $match: {
        date: { $regex: /^\d{4}-\d{2}-\d{2}$/ } // Assuming 'YYYY-MM-DD' format
      }
    };

    // Group stage to aggregate based on the time interval
    let groupStage;
    if (interval === "daily") {
      groupStage = {
        $group: {
          _id: "$date", // Group by the exact date (daily)
          totalBookings: { $sum: 1 }
        }
      };
    } else if (interval === "monthly") {
      groupStage = {
        $group: {
          _id: { $substr: ["$date", 0, 7] }, // Extract 'YYYY-MM' for monthly grouping
          totalBookings: { $sum: 1 }
        }
      };
    }

    const sortStage = {
      $sort: { _id: 1 }
    };

    // Aggregation pipeline
    const bookings = await Appointment.aggregate([
      matchStage,
      groupStage,
      sortStage
    ]);

    res.status(200).send(bookings);
  } catch (error) {
    console.error("Error fetching total bookings over time:", error);
    res.status(500).send("Unable to fetch total bookings over time");
  }
};


const bookappointment = async (req, res) => {
  try {
    const appointment = await Appointment({
      subject: req.body.subject,
      type: req.body.type,
      date: req.body.date,
      time: req.body.time,
      counsellorId: req.body.counsellorId,
      userId: req.locals,
    });

    const usernotification = Notification({
      userId: req.locals,
      content: `You booked an appointment with Counsellor ${req.body.counsellorname} for ${req.body.date} ${req.body.time}`,
    });

    await usernotification.save();

    const user = await User.findById(req.locals);

    const counsellornotification = Notification({
      userId: req.body.counsellorId,
      content: `You have an appointment with ${user.firstname} ${user.lastname} on ${req.body.date} at ${req.body.time}`,
    });

    await counsellornotification.save();

    const result = await appointment.save();

    // Send email to the user

    try {
      const user = await User.findById(req.locals);
      if (user?.email) {
        const userEmail = user.email;
        const emailSubject = "Appointment Confirmation";
        const emailText = `Your appointment is confirmed with Counsellor ${req.body.counsellorname} for ${req.body.date} ${req.body.time}.`;

        await sendEmailWithTemplate(userEmail, user.firstname, emailSubject, emailText);
      }
    } catch (emailError) {
      console.error("Failed to send email:", emailError.message);
    }

    // Send email to the counsellor
    try {
      const counsellor = await User.findById(req.body.counsellorId);
      if (counsellor?.email) {
        const counsellorEmail = counsellor.email;
        const emailSubject = "Appointment Scheduled";
        const emailText = `You have a new appointment scheduled with ${user.firstname} ${user.lastname} on ${req.body.date} at ${req.body.time}.`;

        await sendEmailWithTemplate(counsellorEmail, counsellor.firstname, emailSubject, emailText);
      }
    } catch (emailError) {
      console.error("Failed to send email:", emailError.message);
    }

    return res.status(201).send(result);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Unable to book appointment");
  }
};

const completed = async (req, res) => {
  try {
    const alreadyFound = await Appointment.findOneAndUpdate(
      { _id: req.body.appointid },
      { status: "Completed" }
    );

    const usernotification = Notification({
      userId: req.body.userId,
      content: `Your appointment with Counsellor ${req.body.counsellorname} has been completed`,
    });

    await usernotification.save();

    const user = await User.findById(req.body.userId);

    const counsellornotification = Notification({
      userId: req.body.counsellorId,
      content: `Your appointment with ${user.firstname} ${user.lastname} has been completed`,
    });

    await counsellornotification.save();

    // Send email to the user

    try {
      const userEmail = user.email;
      const emailSubject = "Appointment Completion";
      const emailText = `Your appointment with Counsellor ${req.body.counsellorname} for ${alreadyFound.date} ${alreadyFound.time} has been completed.`;

      await sendEmailWithTemplate(userEmail,user.firstname, emailSubject, emailText);
    } catch (emailError) {
      console.error("Failed to send email:", emailError.message);
    }

    // Send email to the counsellor
    try {
      const counsellor = await User.findById(req.body.counsellorId);
      if (counsellor?.email) {
        const counsellorEmail = counsellor.email;
        const emailSubject = "Appointment Completion";
        const emailText = `Your appointment with ${user.firstname} ${user.lastname} for ${alreadyFound.date} ${alreadyFound.time} has been completed.`;

        await sendEmailWithTemplate(counsellorEmail, counsellor.firstname, emailSubject, emailText);
      }
    } catch (emailError) {
      console.error("Failed to send email:", emailError.message);
    }

    return res.status(201).send("Appointment completed");
  } catch (error) {
    res.status(500).send("Unable to complete appointment");
  }
};

module.exports = {
  getallappointments,
  getupcomingappointments,
  getTotalBookingsOverTime,
  bookappointment,
  completed,
};
