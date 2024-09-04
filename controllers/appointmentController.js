const Appointment = require("../models/appointmentModel");
const Notification = require("../models/notificationModel");
const User = require("../models/userModel");
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
    const filters = [keyword, dateFilter].filter(filter => Object.keys(filter).length > 0);

    // Calculate the number of documents to skip based on the current page
    const skip = (page - 1) * limit;

    // Fetch appointments based on the combined filter, with pagination
    const appointments = await Appointment.find({ $and: filters })
      .populate("counsellorId")
      .populate("userId")
      .skip(skip)
      .limit(parseInt(limit));

    // Count total appointments that match the filters (without pagination)
    const totalAppointments = await Appointment.countDocuments({ $and: filters });

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
      content: `You booked an appointment with Dr. ${req.body.counsellorname} for ${req.body.date} ${req.body.time}`,
    });

    await usernotification.save();

    const user = await User.findById(req.locals);

    const counsellornotification = Notification({
      userId: req.body.counsellorId,
      content: `You have an appointment with ${user.firstname} ${user.lastname} on ${req.body.date} at ${req.body.time}`,
    });

    await counsellornotification.save();

    const result = await appointment.save();
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
      content: `Your appointment with ${req.body.counsellorname} has been completed`,
    });

    await usernotification.save();

    const user = await User.findById(req.body.userId);

    const counsellornotification = Notification({
      userId: req.body.counsellorId,
      content: `Your appointment with ${user.firstname} ${user.lastname} has been completed`,
    });

    await counsellornotification.save();

    return res.status(201).send("Appointment completed");
  } catch (error) {
    res.status(500).send("Unable to complete appointment");
  }
};

module.exports = {
  getallappointments,
  bookappointment,
  completed,
};