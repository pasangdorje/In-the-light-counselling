const Notification = require("../models/notificationModel");

const getallnotifs = async (req, res) => {
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
    const filters = [keyword, dateFilter].filter(filter => Object.keys(filter).length > 0);

    // Calculate the number of documents to skip based on the current page
    const skip = (page - 1) * limit;

    // Fetch notifications based on the combined filter, with pagination
    const notifications = await Notification.find({ $and: filters })
      .skip(skip)
      .limit(parseInt(limit));

    // Count total notifications that match the filters (without pagination)
    const totalNotifications = await Notification.countDocuments({ $and: filters });

    // Return the notifications along with pagination data
    return res.send({
      totalRows: totalNotifications,
      totalPages: Math.ceil(totalNotifications / limit),
      currentPage: parseInt(page),
      data: notifications,
    });
  } catch (error) {
    res.status(500).send("Unable to get notifications");
  }
};

module.exports = {
  getallnotifs,
};
