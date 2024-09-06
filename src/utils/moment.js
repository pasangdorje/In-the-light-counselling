const moment = require("moment");

export const getFormattedTime = (dateString) => {
  if (dateString) {
    return moment(dateString, "HH:mm").format("h:mm A");
  }
};

export const getFormattedDay = (dateString) => {
  if(dateString){
    return moment(dateString).format('MMM');
  }
}