var TelegramBot = require('node-telegram-bot-api');
var janMessages = require('./jan-messages');

console.log("Starting up!");


var token = '135201031:AAFIlf0xObcFn9CiPCtkWbUTT7SITFQ9Mss';

var bot = new TelegramBot(token, {polling: true});
bot.on('text', function (msg) {
  var chatId = msg.chat.id;

  if(msg.text === '/quote') {
  	var message = janMessages[getRandomNumber(janMessages.length) - 1];

    bot.sendMessage(chatId, message);
  }
});

var getRandomNumber = function (max) {
	var randomNumber = Math.floor((Math.random() * max) + 1);
	return randomNumber;
}