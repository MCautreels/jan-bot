var GoogleMapsAPI = require('googlemaps');
var config = require('./config');

module.exports = function (telegramBot)  {
	console.log('Jan de Traffic Man activated');
	telegramBot.on('text', function (msg) {
	  var chatId = msg.chat.id;

	  if(msg.text.toLowerCase().indexOf('/traffic') > -1) {
	  	var messageText = msg.text.replace('/traffic', '').trim();
	  	var parts = messageText.split('->');

	  	var from = parts[0].trim();
	  	var to = parts[1].trim();

	  	telegramBot.sendMessage(chatId, 'Even geduld ... Jan de Traffic Man haalt de gegevens op');

	  	var gm = new GoogleMapsAPI(config);
      gm.directions({
        origin: from,
        destination: to
      }, function (err, data) {
				var routes = data.routes;

      	if(routes.length <= 0) {
      		telegramBot.sendMessage(chatId, 'Sorry jongens Jan de Traffic man vond geen routes');
      		return;
      	}

      	for(var index in routes) {
      		var route = routes[index];
      		telegramBot.sendMessage(chatId, 'Die rit zal je ' + route.legs[0].duration.text + ' kosten. #inhetengelsgaathetook');
      	}
      });
	  }
	});
}