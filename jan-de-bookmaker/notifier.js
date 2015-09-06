var schedule = require('node-schedule');

module.exports = function (bot) {
  console.log("Toggling JAN-DE-BOOKMAKER-NOTIFIER feature: ACTIVATED");

  // Calculate Scores
  var calcScoresSchedule = schedule.scheduleJob('*/15 * * * * *', function () {
    /*findFinishedGames().then(function (finishedGames) {

    });*/
  });
}