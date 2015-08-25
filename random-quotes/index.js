var janMessages = require('./jan-messages');

module.exports = function (telegramBot)  {
	telegramBot.on('text', function (msg) {
	  var chatId = msg.chat.id;

	  if(msg.text === '/quote') {
	  	var message = janMessages[getRandomNumber(janMessages.length) - 1];

	    telegramBot.sendMessage(chatId, message);
	  }
	});

	var getRandomNumber = function (max) {
		var randomNumber = Math.floor((Math.random() * max) + 1);
		return randomNumber;
	}
}