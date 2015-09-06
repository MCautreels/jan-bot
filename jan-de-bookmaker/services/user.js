var User;

/**
 * Constructor for the UserService
 *
 * @class UserService
 * @constructor
 * @param mongoose An initialized mongoose instance
 */
var UserService = function (mongoose) {
  User = mongoose.model('User', {_id: Number, score: Number, firstName: String, lastName: String});
};

/**
 * Retrieves the user by the given userId
 *
 * @param userId unique id which will identify the requested user
 * @returns {Promise} promise of the select
 */
UserService.prototype.findUser = function (userId) {
  return User.findOne({_id: userId});
};

/**
 * Create or update the given user. The _id field is used to find an existing user
 * .
 * @param userInput The User object that should be inserted or updated
 * @returns {Promise} promise of the upsert
 */
UserService.prototype.createOrUpdateUser = function (userInput) {
  return User.update({_id: userInput._id}, userInput, {upsert: true});
};

module.exports = UserService;