weather = require('openweathermap');
var config = require('./config');

module.exports = function (telegramBot) {
    console.log("Toggling JAN-DE-WEERMAN feature: ACTIVATED");

    weather.defaults(config);

    telegramBot.on('text', function (msg) {
        if (msg.text.toLowerCase().indexOf('/weer') > -1) {
            var messageText = msg.text.replace('/weer', '').trim();

            weather.now({q: messageText}, function (err, json) {
                if (err == null) {
                    telegramBot.sendMessage(msg.chat.id, "Vrienden! daar is het " + Math.floor(json['main']['temp']) + " graden. #alsdezonschijntishetmooiweer");
                } else {
                    console.error(err);
                }
            });
        }
    });
}