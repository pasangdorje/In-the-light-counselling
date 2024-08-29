const Counsellor = require("../models/counsellorModel");
const User = require("../models/userModel");
const Notification = require("../models/notificationModel");
const Appointment = require("../models/appointmentModel");

const getallcounsellors = async (req, res) => {
  try {
    let docs;
    if (!req.locals) {
      docs = await Counsellor.find({ isCounsellor: true }).populate("userId");
    } else {
      docs = await Counsellor.find({ isCounsellor: true })
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

const getnotcounsellors = async (req, res) => {
  try {
    const docs = await Counsellor.find({ isCounsellor: false })
      .find({
        _id: { $ne: req.locals },
      })
      .populate("userId");

    return res.send(docs);
  } catch (error) {
    res.status(500).send("Unable to get non counsellors");
  }
};

const applyforcounsellor = async (req, res) => {
  try {
    const alreadyFound = await Counsellor.findOne({ userId: req.locals });
    if (alreadyFound) {
      return res.status(400).send("Application already exists");
    }

    const counsellor = Counsellor({ ...req.body.formDetails, userId: req.locals });
    const result = await counsellor.save();

    return res.status(201).send("Application submitted successfully");
  } catch (error) {
    res.status(500).send("Unable to submit application");
  }
};

const acceptcounsellor = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { isCounsellor: true, status: "accepted" }
    );

    const counsellor = await Counsellor.findOneAndUpdate(
      { userId: req.body.id },
      { isCounsellor: true }
    );

    const notification = await Notification({
      userId: req.body.id,
      content: `Congratulations, Your application has been accepted.`,
    });

    await notification.save();

    return res.status(201).send("Application accepted notification sent");
  } catch (error) {
    res.status(500).send("Error while sending notification");
  }
};

const rejectcounsellor = async (req, res) => {
  try {
    const details = await User.findOneAndUpdate(
      { _id: req.body.id },
      { isCounsellor: false, status: "rejected" }
    );
    const delDoc = await Counsellor.findOneAndDelete({ userId: req.body.id });

    const notification = await Notification({
      userId: req.body.id,
      content: `Sorry, Your application has been rejected.`,
    });

    await notification.save();

    return res.status(201).send("Application rejection notification sent");
  } catch (error) {
    res.status(500).send("Error while rejecting application");
  }
};

const deletecounsellor = async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(req.body.userId, {
      isCounsellor: false,
    });
    const removeDoc = await Counsellor.findOneAndDelete({
      userId: req.body.userId,
    });
    const removeAppoint = await Appointment.findOneAndDelete({
      userId: req.body.userId,
    });
    return res.send("Counsellor deleted successfully");
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Unable to delete counsellor");
  }
};

module.exports = {
  getallcounsellors,
  getnotcounsellors,
  deletecounsellor,
  applyforcounsellor,
  acceptcounsellor,
  rejectcounsellor,
};
