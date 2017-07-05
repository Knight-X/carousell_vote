var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var jsonParser = bodyParser.json({type: 'application/json'});

var mem = [];

console.log(mem);
app.set('view engine', 'ejs');

function desSort(a, b) {
    if (a.votes > b.votes) {
        return -1;
    }
    if (a.votes < b.votes) {
        return 1;
    }
    return 0;
}
//graph 20 articles and sort by the key of each topic
app.get('/', function(req, res) {
    var arr = mem.sort(desSort);
    var rest = [];
    for (var i = 0; i < 20 && i < arr.length; i++) {
        rest[i] = arr[i];
    }
    res.render('index', {
        topics: rest,
    });
});
//create new topic, store in memory which is an array
app.post('/create', jsonParser, function(req, res) {
    console.log(req.body);
    mem.push({title: req.body.topic, votes: 0});
    res.json({publish: 'y'});
});


//increase the vote of article and return the votes num for rendering
app.post('/upvote', jsonParser, function(req, res) {
    console.log(req.body);
    var id = req.body.id;
    mem[id]['votes'] += 1;
    var v_num = mem[id]['votes'];
    res.json({votes: v_num});
});
//decrease the vote of article and return the votes num for rendering
app.post('/downvote', jsonParser, function(req, res) {
    console.log(req.body);
    var id = req.body.id;
    mem[id]['votes'] -= 1;
    var v_num = mem[id]['votes'];
    res.json({votes: v_num});
});


var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("go");
});
