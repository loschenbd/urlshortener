'use strict';

var express = require('express');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});

var cors = require('cors');
require('dotenv').config();


var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.DB_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

let listener = app.listen(process.env.PORT, () => {
  console.log("Node.js is listening on http://localhost:" + listener.address().port);
});
