// Setup Frontend
//var web = require('./web');
//web.init();

// Setup Chat Commands
var utils = require('../utils');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/janbot');

// Setup Services
var UserService = require('./services/user');
var userService = new UserService(mongoose);
var GameService = require('./services/game');
var gameService = new GameService(mongoose);
var BetService = require('./services/bet');
var betService = new BetService(mongoose);

module.exports = function (telegramBot) {
  console.log("Toggling JAN-DE-BOOKMAKER feature: ACTIVATED");

  telegramBot.on('text', function (msg) {
    var chatId = msg.chat.id;
    var userId = msg.from.id;

    var messageText = msg.text.toLowerCase();
    if (messageText.indexOf('/addbet') > -1) {
      addBet();
    } else if (messageText.indexOf('/upcominggames') > -1) {
      showUpcomingGames();
    } else if (messageText.indexOf('/betscore') > -1) {
      showScores();
    }

    /**
     * Commands
     */

    /**
     * /upcominggames 5
     */
    function showUpcomingGames() {
      var message = msg.text.replace('/upcominggames', '');

      if(message.indexOf('tonight') > -1) {
        gameService.findGamesByDate(new Date()).then(replyGameList);
        return;
      }

      var numberOfGames = parseInt(message) || 3;

      gameService.findUpcomingGames(numberOfGames).then(replyGameList);
    }

    /**
     * /addbet CYPBEL 1-5
     */
    function addBet() {
      userService.createOrUpdateUser({
        _id: msg.from.id,
        firstName: msg.from.first_name,
        lastName: msg.from.last_name
      }).then(function (response) {
        console.log(response);
      });

      var message = msg.text.replace('/addbet', '');

      var messageParts = message.trim().split(' ');
      var gameCode = messageParts[0];
      var scoreParts = messageParts[1].split('-');

      var scoreHome = scoreParts[0];
      var scoreAway = scoreParts[1];

      gameService.findGameByCode(gameCode).then(function (game) {
        if (game === null) {
          telegramBot.sendMessage(userId, 'Voetbalkameraad, deze match kon ik niet vinden.');
        } else if (game.date < new Date()) {
          telegramBot.sendMessage(userId, 'Voetbalkameraad, deze match is al begonnen of zelfs afgelopen, nu is het te laat om te gokken!');
        } else {
          betService.createOrUpdateBet({
            gameCode: gameCode,
            scoreHome: scoreHome,
            scoreAway: scoreAway,
            userId: userId
          }).then(function (response) {
            if(response.upserted !== undefined) {
              telegramBot.sendMessage(userId, 'Voetbalkameraad, je voorspelling werd aangemaakt!');
            } else if (response.nModified > 0) {
              telegramBot.sendMessage(userId, 'Voetbalkameraad, je voorspelling werd aangepast!');
            } else {
              telegramBot.sendMessage(userId, 'Voetbalkameraad, laat me niet onnodig werken. Deze voorspelling had je al gemaakt!');
            }
          });
        }
      });
    }

    // /betscores
    function showScores () {
      userService.getAllUsersSortedByScore().then(function (users) {
        for (var index in users) {
          var user = users[index];
          var score = user.score || 0;

          telegramBot.sendMessage(chatId, user.firstName + ' heeft een score van ' + score);
        }
      });
    }

    function replyGameList (games) {
      for (var index in games) {
        var game = games[index];

        game = formatTeamNames(game);

        var gameString = game.gameCode + ': ';
        gameString += game.teamHome + ' speelt tegen ' + game.teamAway;
        gameString += ' op ' + utils.formatDateTime(game.date);

        telegramBot.sendMessage(userId, gameString);
      }
    }
  });

  function formatTeamNames(game) {
    if (game.teamHome === 'Belgium') game.teamHome = game.teamHome.toUpperCase();
    if (game.teamAway === 'Belgium') game.teamAway = game.teamAway.toUpperCase();
    return game;
  }

};