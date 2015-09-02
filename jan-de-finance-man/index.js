var request = require('request');

module.exports = function (telegramBot) {
  console.log("Toggling JAN-DE-FINANCE-MAN feature: ACTIVATED");

  telegramBot.on('text', function (msg) {
    var normalizedMessage = msg.text.toLowerCase();
    if (normalizedMessage.indexOf('/finance') > -1) {
      validateInput(normalizedMessage);
      var inputText = msg.text.replace('/finance', '').trim();

      if(inputText.indexOf('help') > -1) {
        telegramBot.sendMessage(msg.chat.id, 'Vriend, je kan je vraag in deze vorm te stellen: /finance 1500: EUR -> USD');

        request('http://free.currencyconverterapi.com/api/v3/currencies', function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var availableCurrencies = '';
            var currencies = JSON.parse(body).results;

            for(var index in currencies) {
              var currency = currencies[index];
              availableCurrencies += currency.id + ', ';
            }

            telegramBot.sendMessage(msg.chat.id, 'Je kan kiezen uit 1 van de volgende currencies: ' + availableCurrencies);
          }
        });

      } else {
        calculateCurrencyExchange(inputText);
      }

    }

    function calculateCurrencyExchange(inputText) {
      var inputParams = inputText.split(':');
      var amountText = inputParams[0];

      var currencies = inputParams[1].split('->');

      var currencyFrom = currencies[0].trim().toUpperCase();
      var currencyTo = currencies[1].trim().toUpperCase();
      var currenciesString = currencyFrom + '_' + currencyTo;
      var amount = parseFloat(amountText);
      console.log('Requesting currencies: ', currenciesString);
      request('http://free.currencyconverterapi.com/api/v3/convert?q=' + currenciesString + '&compact=y', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var result = JSON.parse(body)[currenciesString];
          if(result !== undefined) {
            var totalResult = Math.round(result.val * amount * 100) / 100;
            telegramBot.sendMessage(msg.chat.id, 'Ah kameraad, ga je op vakantie? Wel voor ' + amount + ' ' + currencyFrom + ' krijg je ' + totalResult + ' ' + currencyTo);
          }
        }
      });
    }

    function validateInput(inputString) {
      if ((inputString.indexOf(':') <= -1 || inputString.indexOf('->') <= -1) && inputString.indexOf('help') <= -1) {
        telegramBot.sendMessage(msg.chat.id, 'Vriend, deze taal versta ik niet! Helfie mij even door je vraag in deze vorm te geven: /finance 1500: EUR -> USD');
      }
    }
  });
};