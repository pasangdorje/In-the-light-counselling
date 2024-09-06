const express = require("express");
const auth = require("../middleware/auth");
const appointmentController = require("../controllers/appointmentController");

const appointRouter = express.Router();

appointRouter.get(
  "/getallappointments",
  auth,
  appointmentController.getallappointments
);

appointRouter.get(
  "/getupcomingappointments",
  auth,
  appointmentController.getupcomingappointments
);

appointRouter.get(
  "/getTotalBookingsOverTime",
  auth,
  appointmentController.getTotalBookingsOverTime
);

appointRouter.post(
  "/bookappointment",
  auth,
  appointmentController.bookappointment
);

appointRouter.put("/completed", auth, appointmentController.completed);

module.exports = appointRouter;
