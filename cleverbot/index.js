//var Cleverbot = require('cleverbot.io');
//
//module.exports = function (telegramBot) {
//    console.log("Starting cleverbot..");
//
//    cleverbot = new Cleverbot("YOUR_API_USER", "YOUR_API_KEY");
//    cleverbot.setNick("JANBOT_435h3426h4v5gj623jh4g523");
//
//    function callback(err, response) {
//        console.error(err);
//        console.log(response);
//    }
//
//    cleverbot.create(callback);
//
//    telegramBot.on('text', function (msg) {
//        cleverbot.ask(msg, callback);
//    });
//}