const Counsellor = require("../models/counsellorModel");
const User = require("../models/userModel");
const Notification = require("../models/notificationModel");
const Appointment = require("../models/appointmentModel");
const { sendEmailWithTemplate } = require("../middleware/mailer");

const getallcounsellors = async (req, res) => {
  try {
    let docs;
    if (!req.locals) {
      docs = await Counsellor.find({ isAccepted: true }).populate("userId");
    } else {
      docs = await Counsellor.find({ isAccepted: true })
        .find({
          _id: { $ne: req.locals },
        })
        .populate("userId");
    }

    return res.send(docs);
  } catch (error) {
    res.status(500).send("Unable to get counsellors");
  }
};

const getpaginatedcounsellors = async (req, res) => {
  try {
    const { search, date, page = 1, limit = 10 } = req.query;

    const keyword = search
      ? {
          $or: [{ userId: search }],
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

    // Fetch counsellors based on the combined filter, with pagination
    const counsellors = await Counsellor.find({ isAccepted: true })
      .find({ $and: filters })
      .skip(skip)
      .limit(parseInt(limit))
      .populate("userId");

    // Count total counsellors that match the filters (without pagination)
    const totalCounsellors = await Counsellor.countDocuments({ $and: filters });

    // Return the counsellors along with pagination data
    return res.send({
      totalRows: totalCounsellors,
      totalPages: Math.ceil(totalCounsellors / limit),
      currentPage: parseInt(page),
      data: counsellors,
    });
  } catch (error) {
    res.status(500).send("Unable to get counsellors");
  }
};

const getnotcounsellors = async (req, res) => {
  try {
    const { search, date, page = 1, limit = 10 } = req.query;

    const keyword = search
      ? {
          $or: [{ userId: search }],
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

    // Fetch counsellors based on the combined filter, with pagination
    const counsellors = await Counsellor.find({ isAccepted: false })
      .find({ $and: filters })
      .skip(skip)
      .limit(parseInt(limit))
      .populate("userId");

    // Count total counsellors that match the filters (without pagination)
    const totalCounsellors = await Counsellor.countDocuments({ $and: filters });

    // Return the counsellors along with pagination data
    return res.send({
      totalRows: totalCounsellors,
      totalPages: Math.ceil(totalCounsellors / limit),
      currentPage: parseInt(page),
      data: counsellors,
    });
  } catch (error) {
    res.status(500).send("Unable to get pending counsellors");
  }

  // try {
  //   const docs = await Counsellor.find({ isAccepted: false })
  //     .find({
  //       _id: { $ne: req.locals },
  //     })
  //     .populate("userId");

  //   return res.send(docs);
  // } catch (error) {
  //   res.status(500).send("Unable to get pending counsellors.");
  // }
};

const applyforcounsellor = async (req, res) => {
  try {
    const already = await Counsellor.findOne({ userId: req.locals });
    if (already) {
      return res.status(400).send("Application already exists");
    }

    const counsellor = Counsellor({
      ...req.body.formDetails,
      userId: req.locals,
    });
    const result = await counsellor.save();

    // Send email to the counsellor
    try {
      const counsellorDetail = await User.findById(req.locals);
      if (counsellorDetail?.email) {
        const counsellorEmail = counsellorDetail.email;
        const emailSubject = "Application Submitted";
        const emailText = `Your application for Counsellor has been submitted.`;

        await sendEmailWithTemplate(counsellorEmail, counsellorDetail.firstname, emailSubject, emailText);
      }
    } catch (emailError) {
      console.error("Failed to send email:", emailError.message);
    }

    return res.status(201).send("Application submitted successfully");
  } catch (error) {
    res.status(500).send("Unable to submit application");
  }
};

const acceptcounsellor = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { status: "accepted" }
    );

    const counsellor = await Counsellor.findOneAndUpdate(
      { userId: req.body.id },
      { isAccepted: true }
    );

    const notification = await Notification({
      userId: req.body.id,
      content: `Congratulations, Your application has been accepted.`,
    });

    await notification.save();

    // Send email to the counsellor
    try {
      const counsellorDetail = await User.findById(req.body.id);
      if (counsellorDetail?.email) {
        const counsellorEmail = counsellorDetail.email;
        const emailSubject = "Application Accepted";
        const emailText = `Congratulations! Your application for Counsellor has been accepted.`;

        await sendEmailWithTemplate(counsellorEmail, counsellorDetail.firstname, emailSubject, emailText);
      }
    } catch (emailError) {
      console.error("Failed to send email:", emailError.message);
    }

    return res.status(201).send("Application accepted notification sent");
  } catch (error) {
    res.status(500).send("Error while sending notification");
  }
};

const rejectcounsellor = async (req, res) => {
  try {
    const details = await User.findOneAndUpdate(
      { _id: req.body.id },
      { isAccepted: false, status: "rejected" }
    );
    const delDoc = await Counsellor.findOneAndDelete({ userId: req.body.id });

    const notification = await Notification({
      userId: req.body.id,
      content: `Sorry, Your application has been rejected.`,
    });

    await notification.save();

    // Send email to the counsellor
    try {
      const counsellorDetail = await User.findById(req.body.id);
      if (counsellorDetail?.email) {
        const counsellorEmail = counsellorDetail.email;
        const emailSubject = "Application Rejected";
        const emailText = `We hope this message finds you well. Unfortunately, we regret to inform you that your application for Counsellor has been rejected.`;

        await sendEmailWithTemplate(counsellorEmail, counsellorDetail.firstname, emailSubject, emailText);
      }
    } catch (emailError) {
      console.error("Failed to send email:", emailError.message);
    }

    return res.status(201).send("Application rejection notification sent");
  } catch (error) {
    res.status(500).send("Error while rejecting application");
  }
};

const deletecounsellor = async (req, res) => {
  try {
    const removeDoc = await Counsellor.findOneAndDelete({
      userId: req.body.userId,
    });
    const removeAppoint = await Appointment.findOneAndDelete({
      userId: req.body.userId,
    });
    // Send email to the counsellor
    try {
      const counsellorDetail = await User.findById(req.body.userId);
      if (counsellorDetail?.email) {
        const counsellorEmail = counsellorDetail.email;
        const emailSubject = "Removed from Counsellor";
        const emailText = `We hope this message finds you well. Unfortunately, we regret to inform you that you have been removed from counsellor position.`;

        await sendEmailWithTemplate(counsellorEmail, counsellorDetail,firstname, emailSubject, emailText);
      }
    } catch (emailError) {
      console.error("Failed to send email:", emailError.message);
    }

    return res.send("Counsellor removed successfully");
  } catch (error) {
    res.status(500).send("Unable to remove counsellor");
  }
};

module.exports = {
  getallcounsellors,
  getpaginatedcounsellors,
  getnotcounsellors,
  deletecounsellor,
  applyforcounsellor,
  acceptcounsellor,
  rejectcounsellor,
};
