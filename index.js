var TelegramBot = require('node-telegram-bot-api');

console.log("Starting up!");

//var token = '139991938:AAEhKJ-tj7x_BuTI1SQBDCwuPQV2GIOb-bg';
var token = '126469180:AAGZPm3eRkaKNk5outwhkwItGhDTs600Hhc';

var bot = new TelegramBot(token, {polling: true});

require('./random-quotes')(bot);
require('./cleverbot')(bot);
require('./time-for-work')(bot);
require('./fabulous')(bot);
require('./goodmorning')(bot);
require('./jan-de-traffic-man')(bot);
require('./jan-de-weerman')(bot);
require('./jan-de-finance-man')(bot);