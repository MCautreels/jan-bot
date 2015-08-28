var TelegramBot = require('node-telegram-bot-api');

console.log("Starting up!");

var token = '135201031:AAFIlf0xObcFn9CiPCtkWbUTT7SITFQ9Mss';

var bot = new TelegramBot(token, {polling: true});

require('./random-quotes')(bot);
//require('./cleverbot')(bot);
require('./time-for-work')(bot);
require('./fabulous')(bot);
require('./hashtag-too-short')(bot);
require('./goodmorning')(bot);