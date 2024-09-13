const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Counsellor = require("../models/counsellorModel");
const Appointment = require("../models/appointmentModel");

const getuser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    return res.send(user);
  } catch (error) {
    res.status(500).send("Unable to get user");
  }
};

const getallusers = async (req, res) => {
  try {
    const { date, page = 1, limit = 10 } = req.query;

    let dateFilter = {};
    if (date) {
      dateFilter = { date };
    }

    // Combine the keyword and date filters
    const filters = [dateFilter].filter(
      (filter) => Object.keys(filter).length > 0
    );

    // Calculate the number of documents to skip based on the current page
    const skip = (page - 1) * limit;

    // Fetch users based on the combined filter, with pagination
    const users = await User.find({ $and: filters })
      .find({ _id: { $ne: req.locals } })
      .skip(skip)
      .limit(parseInt(limit))
      .select("-password");

    // Count total users that match the filters (without pagination)
    const totalUsers = await User.countDocuments({ $and: filters });

    // Return the users along with pagination data
    return res.send({
      totalRows: totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: parseInt(page),
      data: users,
    });
  } catch (error) {
    res.status(500).send("Unable to get all users");
  }
};

const login = async (req, res) => {
  try {
    const emailPresent = await User.findOne({ email: req.body.email });
    if (!emailPresent) {
      return res.status(400).send("Incorrect credentials");
    }
    const verifyPass = await bcrypt.compare(
      req.body.password,
      emailPresent.password
    );
    if (!verifyPass) {
      return res.status(400).send("Incorrect credentials");
    }
    const token = jwt.sign(
      {
        userId: emailPresent._id,
        isAdmin: emailPresent.isAdmin,
        isCounsellorAccount: emailPresent.isCounsellorAccount,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2 days",
      }
    );
    return res.status(201).send({ msg: "User logged in successfully", token });
  } catch (error) {
    res.status(500).send("Unable to login user");
  }
};

const register = async (req, res) => {
  try {
    const emailPresent = await User.findOne({ email: req.body.email });
    if (emailPresent) {
      return res.status(400).send("Email already exists");
    }
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const user = await User({ ...req.body, password: hashedPass });
    const result = await user.save();
    if (!result) {
      return res.status(500).send("Unable to register user");
    }
    return res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(500).send("Unable to register user");
  }
};

const updateprofile = async (req, res) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const result = await User.findByIdAndUpdate(
      { _id: req.locals },
      { ...req.body, password: hashedPass }
    );
    if (!result) {
      return res.status(500).send("Unable to update user");
    }
    return res.status(201).send("User updated successfully");
  } catch (error) {
    res.status(500).send("Unable to update user");
  }
};

const deleteuser = async (req, res) => {
  try {
    // Delete the user
    const result = await User.findByIdAndDelete(req.body.userId);

    if (!result) {
      return res.status(404).send("User not found");
    }

    // Delete the counsellor associated with this user (if any)
    await Counsellor.deleteMany({ userId: req.body.userId });

    // Delete all appointments associated with this user
    await Appointment.deleteMany({ userId: req.body.userId });

    return res.send("User and related data deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Unable to delete user");
  }
};


const getGenderData = async (req, res) => {
  const possibleGenders = ["Male", "Female", "Other"];

  try {
    // Aggregation pipeline
    const genderCounts = await User.aggregate([
      {
        $match: { isCounsellorAccount: false }, // Filter users who are not counsellors
      },
      {
        $group: {
          _id: "$gender",
          count: { $sum: 1 },
        },
      },
    ]);

    // Create a map of gender counts
    const genderCountMap = genderCounts.reduce((map, gender) => {
      map[gender._id] = gender.count;
      return map;
    }, {});

    // Create result with all possible genders
    const result = {
      labels: possibleGenders,
      data: possibleGenders.map((gender) => genderCountMap[gender.toLowerCase()] || 0),
    };

    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  getuser,
  getallusers,
  getGenderData,
  login,
  register,
  updateprofile,
  deleteuser,
};
