weather = require('openweathermap');
var config = require('./config');

module.exports = function (telegramBot) {
    console.log("Toggling JAN-DE-WEERMAN feature: ACTIVATED");

    weather.defaults(config);

    telegramBot.on('text', function (msg) {
        if (msg.text.toLowerCase().indexOf('/weer') > -1) {
            var userLocation = msg.text.replace('/weer', '').replace(/\W/g, '');

            weather.now({q: userLocation}, function (err, data) {
                if (data === undefined) {
                    console.error('No Weather data returned');
                }

                var statusCode = data.cod;
                if (statusCode === 200) {
                    var temperature = Math.floor(data.main.temp);
                    telegramBot.sendMessage(msg.chat.id, "Vrienden! In " + userLocation + " is het " + temperature + " graden. #alsdezonschijntishetmooiweer");
                    return;
                } else {
                    console.error(data.message, userLocation);
                }

                telegramBot.sendMessage(msg.chat.id, "Vrienden! Die plaats bestaat niet en als ze wel bestaat dan is dat gelogen. #mannendiezichzelfgelovenwetenhetbeter");
            });
        }
    });
}