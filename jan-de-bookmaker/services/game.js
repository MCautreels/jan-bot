var Game;

var moment = require('moment');

/**
 * Constructor for the GameService
 *
 * @class GameService
 * @constructor
 * @param mongoose An initialized mongoose instance
 */
var GameService = function (mongoose) {
  Game = mongoose.model('Game', {
    gameCode: String,
    date: Date,
    teamHome: String,
    teamAway: String,
    resultHome: Number,
    resultAway: Number,
    state: String
  });
};

/**
 * Retrieves the game by the given gameId
 *
 * @param gameId unique id which will identify the requested game
 * @returns {Promise} promise of the select
 */
GameService.prototype.findGame = function (gameId) {
  return Game.findOne({_id: gameId});
};

/**
 * Retrieves the game by the given gameCode
 *
 * @param gameCode code which identifies a game
 * @returns {Promise} promise of the select
 */
GameService.prototype.findGameByCode = function (gameCode) {
  return Game.findOne({gameCode: gameCode});
};

/**
 * Retrieves a given amount of upcoming games
 *
 * @param numberOfGames number of upcoming games to retrieve
 * @returns {Promise} promise which will return a number of upcoming games ordered by date
 */
GameService.prototype.findUpcomingGames = function (numberOfGames) {
  return Game.find({'date': {'$gt': new Date()}}).sort({'date': 1}).limit(numberOfGames).exec();
};

GameService.prototype.findGamesByDate = function (date) {
  var startOf = moment(date).startOf('day').toDate();
  var endOf = moment(date).endOf('day').toDate();

  return Game.find({'date': {'$gt': startOf, '$lt': endOf}});
}

module.exports = GameService;