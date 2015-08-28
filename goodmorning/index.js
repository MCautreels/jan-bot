module.exports = function (telegramBot)  {
	telegramBot.on('text', function (msg) {
	  var chatId = msg.chat.id;
	  var user = msg.from.first_name;

	  if((msg.text.toLowerCase().indexOf('goeiemorgen') > -1 || msg.text.toLowerCase().indexOf('goedemorgen') > -1) && msg.text.toLowerCase().indexOf('jan')) {
	    telegramBot.sendMessage(chatId, 'Goeiemorgen ' + user);
	  }
	});
}