var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var Log = require('log');
    log = new Log('debug');

var port =  process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res){
    res.redirect('index.html');
});
io.on('connection', function(socket){
    socket.on('stream', function(image){
        console.log('emiting broad cast');
        socket.broadcast.emit('stream', image);
    });
});
app.use(function(err, req, resp, next){
    console.log(err);
});
server.listen(port, function(req, res){
    log.info('Server Listening on port %s', port);
});