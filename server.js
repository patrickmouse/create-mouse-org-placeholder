var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var request = require('request')


var app = express();

var port = process.env.PORT || 3000;

if(process.env.environment == 'PRODUCTION'){
	app.get('*',function(req,res,next){
	  if(req.headers['x-forwarded-proto']!='https')
	    res.redirect('https://tools.mouse.org'+req.url)
	  else
	    next()
	})
}

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.get('/', function(req,res){
	res.sendFile(__dirname + '/templates/index.html');
});

// * * * * * * * *
// Special Pages:
// * * * * * * * *

app.get("/playlist", function(req, res) {
	res.redirect("/help/groups-and-playlists/");
})

app.get("/group-work", function(req, res) {
	res.redirect("/help/groups-and-playlists/");
});

app.get("/group-members", function(req, res) {
	res.redirect("/help/groups-and-playlists/");
})

app.get("/badges", function(req, res) {
	res.redirect("/help/badges/");
})



app.get('/.well-known/acme-challenge/' + process.env.SSLDIR, function(req, res) {
  res.send(process.env.SSLCONTENT);
})

app.listen(port, function(){
  console.log('Gulp is running on PORT: ' + port);
})

module.exports = app;
