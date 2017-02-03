var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var search = require("./deezer/lib/search");
var deezer = require("./deezer/api/deezer")(app, search, bodyParser);

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("API Deezer on port "+ port)
})
