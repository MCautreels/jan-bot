//var Cleverbot = require('cleverbot.io');
//
//module.exports = function (/*telegramBot*/) {
//    console.log("Adding cleverbot feature..");
//
//    cleverbot = new Cleverbot("Hkh3j4X590P2mzCT", "8VtfotmZrhCJOPpm17h0Yaen1uhd2EgM", "JANBOT_7wa4cxvjvb4l68y4ta");
//
//    function callback(err, response) {
//        //console.error(err);
//        //console.log(response);
//        telegramBot.sendMessage(response.chatId, message);
//    }
//
//    cleverbot.create(callback);
//    cleverbot.ask('Hi there', callback);
//
//
//
//    //var msg.test = "Jan, hi there!";
//    telegramBot.on('text', function (msg) {
//    if (msg.text.toLowerCase().indexOf("jan, ") > -1) {
//        msg.chat.id
//        cleverbot.ask(msg.text, callback);
//    }
//    });
//}