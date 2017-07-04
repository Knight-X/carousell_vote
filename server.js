var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var jsonParser = bodyParser.json({type: 'application/json'});

var topic_count = 0
var mem = {} 

app.set('view engine', 'ejs');
app.get('/', function(req, res) {
    res.render('hello', {
        topics: mem,
    });
});
app.post('/create', jsonParser, function(req, res) {
    console.log(req.body);
    var topicid = "id" + topic_count;
    mem[topicid] = {title: req.body.topic, votes: "0"};
    res.json({publish: 'y'});
});

app.post('/vote', jsonParser, function(req, res) {
    console.log(req.body);
    //mem[id]['votes'] += 1;
    res.json({m: 'g'});
});


var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("go");
});
