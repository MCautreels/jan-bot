var schedule = require('node-schedule');
var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');

var GameService = require('./services/game');
var gameService;
var LeagueService = require('./services/league');
var leagueService;

module.exports = function (mongoose) {
  console.log("Toggling JAN-DE-BOOKMAKER-NOTIFIER feature: ACTIVATED");

  gameService = new GameService(mongoose);
  leagueService = new LeagueService(mongoose);

  var retrieveScores = schedule.scheduleJob('*/15 * * * *', function () {
    var todayString = moment().format('YYYYMMDD');

    retrieveAndSaveGamesForDate(todayString);
    // Calculate Scores
    calculateScores();
  });

  var calculateScores = function () {
    gameService.findByStatus(gameService.STATUSES.FINISHED).then(function (games) {
      for(var gameIndex in games) {
        var game = games[gameIndex];


      }
    });
  };

  var retrieveUpcomingMatches = schedule.scheduleJob('0 0 * * *', function () {
    var nextWeekString = moment().add(5, 'days').format('YYYYMMDD');

    retrieveAndSaveGamesForDate(nextWeekString);
  });

  var retrieveAndSaveGamesForDate = function (dateString) {
    request('http://www.espnfc.com/scores?date=' + dateString, function (error, response, html) {
      if (!error) {
        var $ = cheerio.load(html);
        var games = [];

        leagueService.findAllLeagues().then(function (leagues) {
          for (var leagueIndex in leagues) {
            var league = leagues[leagueIndex];

            var leagueHtml = $('#score-leagues .score-league[data-league-id="' + league.espnfcId + '"]');

            $(leagueHtml).find('.score').each(function (i, element) {
              var gameId = $(this).data('gameid');
              var teamNames = $(this).find('.team-name span');
              var teamScores = $(this).find('.team-score span');
              var gameDate = moment($(this).find('.game-info .time').data('time'));

              var scoreHome = $(teamScores[0]).text();
              var scoreAway = $(teamScores[1]).text();

              var status = 'SCHEDULED';

              if(scoreHome !== null && scoreAway !== null) {
                status = 'FINISHED';
              }

              var game = {
                espnfcId: gameId,
                teamHome: $(teamNames[0]).text(),
                teamAway: $(teamNames[1]).text(),
                date: gameDate.toDate(),
                resultHome: $(teamScores[0]).text(),
                resultAway: $(teamScores[1]).text(),
                state: status
              };

              gameService.createOrUpdate(game).then(function () {
              });
            });
          }
        });
      } else {
        console.log(error);
      }

      console.log('Finished retrieving games for ' + dateString);
    });
  }
}