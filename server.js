'use strict';

var express = require('express');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
require('dotenv').config();

var cors = require('cors');
require('dotenv').config();


var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.DB_URI);
mongoose.connect("mongodb+srv://"+ process.env.MONGO_USER +":"+ process.env.MONGO_PASS +"@cluster0.nlxxb.mongodb.net/" +process.env.MONGO_DB
  , {useNewUrlParser: true,
    useUnifiedTopology: true});
mongoose.connection.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
  process.exit(1);
});

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
var bodyParser = require('body-parser');

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});


  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Create URL Schema
let urlSchema = new mongoose.Schema({
  stored_url: {type: String, required: true},
  short: Number
});

// Create URL Model
let Url = mongoose.model('Url', urlSchema);
let resObj = {};

app.post('/api/shorturl/new', bodyParser.urlencoded({ extended: false }) , (req, res) => {
  let inputLink = req.body['url'];
  resObj['stored_url'] = inputLink;

  res.json(resObj);
});

// Listen
let listener = app.listen(process.env.PORT, () => {
  console.log("Node.js is listening on http://localhost:" + listener.address().port);
});

