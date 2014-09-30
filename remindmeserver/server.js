'use strict';

var routes = require('./routes/routes.js');
var express = require('express');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/public'));
});

app.set('view options', {
    layout: false
});

app.post('/createReminder', routes.createReminder);

app.listen(app.get('port'), function () {
    console.log("Server listening on port " + app.get('port'));
});



