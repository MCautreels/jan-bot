var Bet;

/**
 * Constructor for the BetService
 *
 * @class BetService
 * @constructor
 * @param mongoose An initialized mongoose instance
 */
var BetService = function (mongoose) {
  Bet = mongoose.model('Bet', {gameCode: String, scoreHome: Number, scoreAway: Number, userId: Number});
};

/**
 * Retrieves the bet by the given betId
 *
 * @param betId unique id which will identify the requested bet
 * @returns {Promise} promise of the select
 */
BetService.prototype.findBet = function (betId) {
  return Bet.findOne({_id: betId});
};

/**
 * Retrieves the bet by given userId and gameCode
 *
 * @param userId id of the user requesting the bet
 * @param gameCode gameCode to identify the bet
 * @returns {Promise} promise return the found bet
 */
BetService.prototype.findBetByUserIdAndGameCode = function (userId, gameCode) {
  return Bet.findOne({'gameCode': gameCode, 'userId': userId});
};

/**
 * Create or update the given bet. The userId and gameCode fields are used to find an existing bet
 * .
 * @param bet The Bet object that should be inserted or updated
 * @returns {Promise} promise of the upsert
 */
BetService.prototype.createOrUpdateBet = function (bet) {
  return Bet.update({gameCode: bet.gameCode, userId: bet.userId}, bet, {upsert: true});
};

module.exports = BetService;