var moment = require('moment');

module.exports = {
  formatDateTime: formatDateTime,
  toReadableTime: toReadableTime
};

function formatDateTime(dateTime) {
  dateTime = moment(dateTime);
  if(dateTime.isSame(moment(), 'day')) {
    return dateTime.format('HH:mm');
  } else {
    return dateTime.format('D MMM YYYY HH:mm');
  }
}

function toReadableTime (time) {
  var hours = Math.round(time / 3600);
  var minutes = time % 3600 / 60;

  var timeString = '';
  if(hours > 0) {
    timeString = hours + ' uur en ';
  }
  timeString += minutes + ' minuten';

  return  timeString;
}