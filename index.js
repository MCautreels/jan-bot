var TelegramBot = require('node-telegram-bot-api');

console.log("Starting up!");

var token = '135201031:AAGLgQrXd0_IkPvVVrD5cKjf64hQVhqocPU';

var bot = new TelegramBot(token, {polling: true});

require('./random-quotes')(bot);
require('./cleverbot')(bot);
require('./time-for-work')(bot);
require('./fabulous')(bot);
require('./goodmorning')(bot);
require('./jan-de-traffic-man')(bot);
require('./jan-de-weerman')(bot);