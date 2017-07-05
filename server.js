var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var jsonParser = bodyParser.json({type: 'application/json'});

var topic_count = 0
var mem = [] 
mem[0] = {title: "kai", votes: 5};
mem[1] = {title: "gy", votes: 6};
console.log(mem);
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
    res.render('index', {
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
    var id = req.body.id;
    mem[id]['votes'] += 1;
    var v_num = mem[id]['votes'];
    res.json({votes: v_num});
});


var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("go");
});
