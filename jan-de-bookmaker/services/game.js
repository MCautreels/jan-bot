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
  try {
    Game = mongoose.model('Game');
  } catch (err) {
    Game = mongoose.model('Game', {
      espnfcId: Number,
      date: Date,
      teamHome: String,
      teamAway: String,
      resultHome: Number,
      resultAway: Number,
      state: String
    });
  }
};

GameService.prototype.STATUSES = {
  SCHEDULED: 'SCHEDULED',
  FINISHED: 'FINISHED',
  PROCESSED: 'PROCESSED'
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
 * Retrieves the game by the given espnfcId
 *
 * @param gameCode espnfcId which identifies a game
 * @returns {Promise} promise of the select
 */
GameService.prototype.findGameByEspnfc = function (espnfcId) {
  return Game.findOne({espnfcId: espnfcId});
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

/**
 * Retrieves the Games which take place on a given date.
 *
 * @param date date on which the matches should take place
 * @returns {Query|FindOperatorsOrdered|*|Cursor|FindOperatorsUnordered}
 */
GameService.prototype.findGamesByDate = function (date) {
  var startOf = moment(date).startOf('day').toDate();
  var endOf = moment(date).endOf('day').toDate();

  return Game.find({'date': {'$gt': startOf, '$lt': endOf}});
};

/**
 * Returns a list of Games that are in the given status
 *
 * @param status status to use as a filter
 * @returns {Promise} promise which returns the requested games
 */
GameService.prototype.findByStatus = function (status) {
  return Game.find({status: status});
};

/**
 * Creates or updates a game
 *
 * @param game the given game will be created
 * @returns {Promise} promise which returns the created game
 */
GameService.prototype.createOrUpdate = function (game) {
  return Game.update({espnfcId: game.espnfcId}, game, {upsert: true});
};

module.exports = GameService;