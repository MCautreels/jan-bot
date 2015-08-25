module.exports = function (telegramBot)  {
	telegramBot.on('text', function (msg) {
	  var chatId = msg.chat.id;

	  if(msg.text.toLowerCase() === 'is it time for work yet?') {
	    telegramBot.sendMessage(chatId, 'Nope');
	  }
	});
}