var Cleverbot = require('cleverbot.io');
var cleverJan = require('./clever-jan')(Cleverbot);
var janTranslate = require('./jan-translate')();

module.exports = function (telegramBot) {
    console.log("Toggling CLEVERBOT feature: ACTIVATED");

    telegramBot.on('text', function (msg) {
        var messageNormalized = msg.text.toLowerCase().trim();
        if (messageNormalized.indexOf("jan, ") > -1) {
            var messageNormalizedWithoutJanText = messageNormalized.split("jan, ")[1];

            janTranslate.translate(messageNormalizedWithoutJanText, 'nl', 'en', function(err, res){
                var translatedText = res.translated_text

                askCleverBot(translatedText, msg.chat.id);
            });
        }
    });

    function askCleverBot(translatedText, chatId) {
        console.log("Asking Cleverbot: " + translatedText);
        cleverJan.ask(translatedText, function (err, response) {
            console.log("Got response: " + response);
            if (err === false) {
                janTranslate.translate(response, 'en', 'nl', function(err, res){
                    var translatedText = res.translated_text

                    telegramBot.sendMessage(chatId, translatedText);
                });
            } else {
                console.log('Response: ', response);
                console.log('Error: ', err);
                telegramBot.sendMessage(chatId, 'Dat heb ik niet goed verstaan, kan je dat nog eens herhalen? #jewordtdoofvanjeweetwel');
            }
        });
    }
};

