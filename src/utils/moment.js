const moment = require("moment");

const time24 = "16:30";
const time12 = moment(time24, "HH:mm").format("h:mm A");

export const getFormattedTime = (dateString) => {
  if (dateString) {
    return moment(dateString, "HH:mm").format("h:mm A");
  }
};
