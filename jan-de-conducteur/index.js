var request = require('request');
var moment = require('moment');

module.exports = function (telegramBot) {
  console.log("Toggling JAN-DE-CONDUCTEUR feature: ACTIVATED");

  telegramBot.on('text', function (msg) {
    var chatId = msg.chat.id;

    if (msg.text.toLowerCase().indexOf('/train') > -1) {
      var messageText = msg.text.replace('/train', '').trim();
      var parts = messageText.split('->');

      var from = parts[0].trim();
      var to = parts[1].trim();

      telegramBot.sendMessage(msg.from.id, 'Even geduld ... Jan de Conducteur haalt de gegevens op');

      request('http://api.irail.be/connections/?from=' + from + '&to=' + to + '&format=json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var result = JSON.parse(body);

          for(var index in result.connection) {
            if(index >= 3) {
              return;
            }

            var connection = result.connection[index];
            var connectionString = parseConnection(connection);
            telegramBot.sendMessage(msg.from.id, connectionString);
          }
        } else {
          console.log(error);
          console.log(response);
          telegramBot.sendMessage(msg.from.id, 'Ik heb niet gevonden wat je zocht, kijk misschien even via www.irail.be');
        }
      });
    }

    function parseConnection (connection) {
      var departure = connection.departure;
      var arrival = connection.arrival;
      var vias = connection.vias;

      var departureTime = moment.unix(departure.time);
      var arrivalTime = moment.unix(arrival.time);

      var connectionString = 'Je trein vertrekt in ';
      connectionString += departure.station + ' ';
      connectionString += '(Perron ' + departure.platform + ') ';
      connectionString += 'om ' + formatDateTime(departureTime) + ' ';

      if(vias !== undefined) {
        connectionString += '. ';
        connectionString += 'Je reist via ';

        for(var index in vias.via) {
          var via = vias.via[index];
          var viaStation = via.station;
          var arrivalPlatform = via.arrival.platform;
          var departurePlatform = via.departure.platform;

          connectionString += viaStation += ' ';
          connectionString += '(P' + arrivalPlatform + ' -> P' + departurePlatform + ') ';
        }
      }

      connectionString += 'en komt ' + toReadableTime(connection.duration) + ' later aan ';
      connectionString += 'in ' + arrival.station + ' ';
      connectionString += '(Perron ' + arrival.platform + ') ';
      connectionString += 'om ' + formatDateTime(arrivalTime);

      return connectionString;
    }

    function toReadableTime (time) {
      var hours = Math.round(time / 3600);
      var minutes = time % 3600 / 60;

      var timeString = '';
      if(hours > 0) {
        timeString = hours + ' uur en ';
      }
      timeString += minutes + ' minuten';

      return  timeString;
    }

    function formatDateTime(dateTime) {
      if(dateTime.isSame(moment(), 'day')) {
        return dateTime.format('HH:mm');
      } else {
        return dateTime.format('D MMM YYYY HH:mm');
      }
    }
  });
};