var http = require('http'),
database = require('./database');

var emailDatabase = false;

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
    if (data.length == 3)
      database.insertCredentials({website: data.website, username: data.username, password: data.password});
    else {
      database.insertCredentials({email: data});
      emailDatabase = true;
    }
  });

  res.end('{"msg": "OK"}');

});

// Start server
server.listen(SERVER_PORT);
