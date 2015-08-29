var Cleverbot = require('cleverbot.io');

module.exports = function (telegramBot) {
    console.log("Toggling CLEVERBOT feature: ACTIVATED");

    telegramBot.on('text', function (msg) {
        var messageNormalized = msg.text.toLowerCase().trim();
        if (messageNormalized.indexOf("jan, ") > -1) {
            var messageNormalizedWithoutJanText = messageNormalized.split("jan, ")[1];
            console.log("Asking Cleverbot: " + messageNormalizedWithoutJanText);

            (new Cleverbot("Hkh3j4X590P2mzCT", "8VtfotmZrhCJOPpm17h0Yaen1uhd2EgM", "JANBOT_7wa4cxvjvb4l68y4ta"))
                .ask(messageNormalizedWithoutJanText, function (err, response) {
                    console.log("Got response: " + response);
                    if (err === false) {
                        telegramBot.sendMessage(msg.chat.id, response);
                    }
                });

        }
    });
}