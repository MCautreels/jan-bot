var League;

var moment = require('moment');

/**
 * Constructor for the LeagueService
 *
 * @class LeagueService
 * @constructor
 * @param mongoose An initialized mongoose instance
 */
var LeagueService = function (mongoose) {
  try {
    League = mongoose.model('League');
  } catch(err) {
    League = mongoose.model('League', {
      name: String,
      espnfcId: Number
    });
  }
};

/**
 * Retrieves the league by the given leagueId
 *
 * @param leagueId unique id which will identify the requested league
 * @returns {Promise} promise of the select
 */
LeagueService.prototype.findLeague = function (leagueId) {
  return League.findOne({_id: leagueId});
};

/**
 * Retrieves the league by the given espnfcId
 *
 * @param espnfcId id which will identify the requested league
 * @returns {Promise} promise of the select
 */
LeagueService.prototype.findLeagueByEspnfcId = function (espnfcId) {
  return League.findOne({espnfcId: espnfcId});
};

/**
 * Retrieves all leagues
 *
 * @returns {Promise} promise return all leagues
 */
LeagueService.prototype.findAllLeagues = function () {
  return League.find({});
};

module.exports = LeagueService;