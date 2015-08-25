var TelegramBot = require('node-telegram-bot-api');
var Facebook = require('facebook-node-sdk');
 
 console.log("Hello World");
 
var token = '135201031:AAFIlf0xObcFn9CiPCtkWbUTT7SITFQ9Mss';
// Setup polling way 
var bot = new TelegramBot(token, {polling: true});
bot.on('text', function (msg) {
  var chatId = msg.chat.id;
  // photo can be: a file path, a stream or a Telegram file_id 
//  var photo = 'cats.png';
  bot.sendMessage(chatId, 'HALLO TEST');
//});