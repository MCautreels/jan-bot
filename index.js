var TelegramBot = require('node-telegram-bot-api');
var Facebook = require('facebook-node-sdk');

console.log("Starting up!");

var facebook = new Facebook({ appId: '1479298715703680', secret: 'c16f2f97780cab8af4c13b7458b0aecf' });



//User-ID Jan: 1110914570
//facebook.api('/1110914570/feed', function(err, data) {
//    console.log(err);
//    console.log(data);
//});


var token = '135201031:AAFIlf0xObcFn9CiPCtkWbUTT7SITFQ9Mss';

var bot = new TelegramBot(token, {polling: true});
bot.on('photo', function (msg) {
  var chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Wie goed doet; Goed ontmoet!');
});