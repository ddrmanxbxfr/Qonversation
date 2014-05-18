var http = require('http'),
    faye = require('faye'),
    express = require('express'),
    bodyParser = require('body-parser');

var bayeux = new faye.NodeAdapter({mount: '/chat_server'});
var app = express();

var server = http.createServer(app);

bayeux.attach(server);

app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/components'));

app.post('/message', function(req, res) {
  console.log('Got message from chat client!');
  bayeux.getClient().publish('/channel', {text: req.body.message});
  res.send(200);
});

server.listen(1337);
console.log("server running at 1337");
