'use strict';



// this js file is done;

const PORT = process.env.PORT || 3000;

// generic middleware;
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var app = express();

//middleware settings;
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// loads up html;
app.get('/', function(req, res){
	var indexPath = path.join(__dirname, 'index.html');
	res.sendFile(indexPath);
});

// paths to router;
app.use('/skus',require("./routes/skus"));

// da server;
var server = http.createServer(app);
server.listen(PORT, function(){
	console.log(`you're now listening to ${PORT}, smooth jazz`);
});