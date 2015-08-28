var fs = require('fs');

module.exports = function (telegramBot) {
    console.log("Toggling fabulous feature: ACTIVATED");

    telegramBot.on('text', function (msg) {
        if (msg.text.toLowerCase().indexOf('fabulous') > -1) {
            telegramBot.sendPhoto(msg.chat.id, fs.createReadStream(__dirname + '/fabulous0.jpg'));
            telegramBot.sendMessage(msg.chat.id, "bitch, I'm fabulous");
        }
    });
}