var http = require('http'),
database = require('./database');

var SERVER_PORT = 4000;

// Create HTTP server
var server = http.createServer(function (req, res) {
  console.log('Request received');

  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': '*'
  });
  req.on('data', function (data) {
    console.log('the data is ' + data);
  });

  res.end('{"msg": "OK"}');

});

// Start server
server.listen(SERVER_PORT);

// Insert in database
database.insertCredentials({email: "andrew@chesscademy.com", website: ["twitter.com", "facebook.com"], username: "Chesscademy", password: "ibet1000leaves"});