var http = require('http'),
    faye = require('faye'),
    express = require('express'),
    passport = require('passport'),
    bodyParser = require('body-parser');

var nano = require('nano')('http://localhost:5984');
var dbPresistence = nano.use('qonversation_messages');
var dbUsers = nano.use('qonversation_users');

var ps = new faye.NodeAdapter({
    mount: '/chat_server'
});

var app = express();

var server = http.createServer(app);

ps.attach(server);

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

// Différentes methodes de monitoring API de ps
ps.on('handshake', function(clientId) {
    // event listener logic
    console.log('Client connected Id : ' + clientId);
});

ps.on('subscribe', function(clientId, channel) {
    // event listener logic
    console.log('Client ' + clientId + ' subscribed to ' + channel)
});


ps.on('publish', function(clientId, channel, data) {
    // Storing the message in the database
    var doc = {
    nickname: data.nickname,
    channel: channel,
    message: data.text
  };

  dbPresistence.insert(doc, function(err, body) {
  if (err) console.log(err);
});

});

var channels = [];

// Create a new channel
app.post('/channels', function(req, res) {
    req.accepts('application/json');

    if (req.body.name) {
        var alreadyExist = channels.some(function(channel) {
            return channel.name == req.body.name;
        });

        if (alreadyExist) {
            var msg = 'A channel with this name already exist.';
            console.log(msg);
            res.json(423, {
                msg: msg
            });
        }
        else {
            var msg = 'The channel as been created.';
            console.log(msg);
            channels.push(req.body);
            res.json(201, {
                msg: msg
            });
        }
    }
});

app.post('/message', function(req, res) {
    console.log('Got message from chat client!');
    ps.getClient().publish('/channel', {
        text: req.body.message
    });
    res.send(200);
});

server.listen(1337);
console.log("server running at 1337");
