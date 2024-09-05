const express = require("express");
const counsellorController = require("../controllers/counsellorController");
const auth = require("../middleware/auth");

const counsellorRouter = express.Router();

counsellorRouter.get("/getallcounsellors", counsellorController.getallcounsellors);

counsellorRouter.get("/getpaginatedcounsellors", counsellorController.getpaginatedcounsellors);

counsellorRouter.get("/getnotcounsellors", auth, counsellorController.getnotcounsellors);

counsellorRouter.post("/applyforcounsellor", auth, counsellorController.applyforcounsellor);

counsellorRouter.put("/deletecounsellor", auth, counsellorController.deletecounsellor);

counsellorRouter.put("/acceptcounsellor", auth, counsellorController.acceptcounsellor);

counsellorRouter.put("/rejectcounsellor", auth, counsellorController.rejectcounsellor);

module.exports = counsellorRouter;
