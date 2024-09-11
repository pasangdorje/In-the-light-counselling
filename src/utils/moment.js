const moment = require("moment");

export const getFormattedTime = (dateString) => {
  if (dateString) {
    return moment(dateString, "HH:mm").format("h:mm A");
  }
};

export const getFormattedDay = (dateString) => {
  if (dateString) {
    return moment(dateString).format("MMM");
  }
};

export const isNotPastDate = (dateString, time) => {
  if (dateString === moment().format("YYYY-MM-DD")) {
    return moment().format("HH:MM") <= time;
  } else if (dateString < moment().format("YYYY-MM-DD")) {
    return false;
  } else {
    return true;
  }
};
