var http = require('http'),
  faye = require('faye'),
  express = require('express'),
  bodyParser = require('body-parser');

var bayeux = new faye.NodeAdapter({
  mount: '/chat_server'
});
var app = express();

var server = http.createServer(app);

bayeux.attach(server);

app.use(bodyParser());

// Setup CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// Setup status routes
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/components'));


//// Différentes methodes de monitoring API de bayeux
bayeux.on('handshake', function(clientId) {
  // event listener logic
  console.log('Client connected Id : ' + clientId);
});

bayeux.on('subscribe', function(clientId, channel) {
  // event listener logic
  console.log('Client ' + clientId + ' subscribed to ' + channel)
});


bayeux.on('publish', function(clientId, channel, data) {
  // event listener logic
  console.log('Client ' + clientId + ' talked in ' + channel + ' he said ' + data.text)
});

server.listen(1337);
console.log("server running at 1337");