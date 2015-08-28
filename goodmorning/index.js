module.exports = function (telegramBot)  {
	telegramBot.on('text', function (msg) {
	  var chatId = msg.chat.id;
	  var userFirstName = msg.from.first_name;
	  var userLastName = msg.from.last_name;

	  user = userFirstName;

	  if(userFirstName === 'Wouter' && userLastName === 'Thys') user = 'Flappy';
	  if(userFirstName === 'Wout') user = 'Van Immerseelke';
	  if(userFirstName === 'Siebe') user = 'oh almachtige god';

	  if((msg.text.toLowerCase().indexOf('goeiemorgen') > -1 || msg.text.toLowerCase().indexOf('goedemorgen') > -1) && msg.text.toLowerCase().indexOf('jan')) {
	    telegramBot.sendMessage(chatId, 'Goeiemorgen ' + user + '!');
	  }

	  if((msg.text.toLowerCase().indexOf('goeiemiddag') > -1 || msg.text.toLowerCase().indexOf('goedemiddag') > -1) && msg.text.toLowerCase().indexOf('jan')) {
	    telegramBot.sendMessage(chatId, 'Goedemiddag ' + user + '!');
	  }

	  if((msg.text.toLowerCase().indexOf('slaapwel') > -1 ) && msg.text.toLowerCase().indexOf('jan')) {
	    telegramBot.sendMessage(chatId, 'Slaapwel ' + user + '!');
	  }
	});
}