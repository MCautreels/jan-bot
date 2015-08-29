var janMessages = require('./jan-messages');
var _ = require('lodash');
var Random = require("random-js");

module.exports = function (telegramBot)  {
	telegramBot.on('text', function (msg) {
	  var chatId = msg.chat.id;

	  if(msg.text === '/quote') {
	  	var message = janMessages[getRandomNumber(janMessages.length) - 1];

	    telegramBot.sendMessage(chatId, message);
	  }
	  else if(msg.text.indexOf('#') === 0) {
		telegramBot.sendMessage(chatId, geefRandomHash());
	  }
	  
	});

	var geefRandomHash = function(){
		var hastags = _.filter(janMessages, function(quote){ return quote.indexOf('#') === 0;});
		var message = hastags[getRandomNumber(hastags.length) - 1];
		
		return message;
	}

	var getRandomNumber = function (max) {
		var random = new Random(Random.engines.mt19937().autoSeed());
		return random.integer(0, max);
	}
}