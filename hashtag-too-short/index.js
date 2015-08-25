module.exports = function (telegramBot)  {
	telegramBot.on('text', function (msg) {
	  var chatId = msg.chat.id;

	  if(msg.text.indexOf('#') > -1) {
	    telegramBot.sendMessage(chatId, '#hetleveniszoveelmooiermetextralangeonleesbarehashtags');
	  }
	});
}