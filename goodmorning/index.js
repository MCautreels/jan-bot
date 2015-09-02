module.exports = function (telegramBot)  {
	telegramBot.on('text', function (msg) {
	  var chatId = msg.chat.id;
	  var userFirstName = msg.from.first_name;
	  var userLastName = msg.from.last_name;

	  var user = userFirstName;
	  var message = msg.text.toLowerCase();

	  if(userFirstName === 'Wouter' && userLastName === 'Thys') user = 'Walflap';
	  if(userFirstName === 'Wout') user = 'Van Immerseelke';

	  if((message.indexOf('goeiemorgen') > -1 || message.indexOf('goedemorgen') > -1) && message.indexOf('jan') > -1) {
	    telegramBot.sendMessage(chatId, 'Goeiemorgen ' + user + '!');
	  }

	  if((message.indexOf('goeiemiddag') > -1 || message.indexOf('goedemiddag') > -1) && message.indexOf('jan') > -1) {
	    telegramBot.sendMessage(chatId, 'Goedemiddag ' + user + '!');
	  }

	  if((message.indexOf('goeienavond') > -1 || message.indexOf('goedenavond') > -1) && message.indexOf('jan') > -1) {
	    telegramBot.sendMessage(chatId, 'Goedenavond ' + user + '!');
	  }

	  if((message.indexOf('slaapwel') > -1 ) && message.indexOf('jan') > -1) {
	    telegramBot.sendMessage(chatId, 'Slaapwel ' + user + '!');
	  }

	  var deWaarheidRegEx = /.*waar.*(he|eh).*jan.*/;
	  if(deWaarheidRegEx.test(message)) {
    if(Math.random()<.5){
			telegramBot.sendMessage(chatId, 'Dat is waar, vriend!');
		} else {
			telegramBot.sendMessage(chatId, 'Denk wat je wil, vriend. Ik heb andere zaken te doen, en jij vast ook.');
		}
	  }
	});
}