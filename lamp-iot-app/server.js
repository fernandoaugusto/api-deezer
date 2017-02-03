var express = require('express');
var app = express();
var bodyParser = require('body-parser');


var firebase = require("firebase-admin");

firebase.initializeApp({
  credential: firebase.credential.cert("config/serviceAccountKey.json"),
  databaseURL: "https://inspecaomaquinas1.firebaseio.com"
});

// Get a reference to the database service
/*var database = firebase.database();*/

// Create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


/*LAMP APIs*/

app.get('/lamp/status', function(req, res) {

  console.log("Reached webservice - /lamp/status");

  exec = firebase.database().ref('/lamp/status').once('value').then(function(snapshot) {
    var lamp_status = snapshot.val().lamp_status;

    if (exec) {
      console.log("Read Firebase - Current Lamp Status Command: " + lamp_status);
      if (lamp_status == "on") {
        lamp_status = "_on";
      }
      res.send('Status:' + lamp_status);
    }else {
      console.log("Error reading Firebase");
      res.send('Status:err');
    }

  });

});

app.get('/lamp/mode/:command', function(req, res) {

  lamp_status = req.params.command;

  if (lamp_status.toLowerCase() == "on" || lamp_status.toLowerCase() == "off") {
    var postData = {
      lamp_status: lamp_status.toLowerCase()
    };

    exec = firebase.database().ref('lamp/status').set(postData);

    if (exec) {
      res.send('POST - Data was inserted in db');
    }else{
      res.send('POST - Not inserted in db');
    }
  }else {
    res.send('POST - Not inserted in db: params not ON or OFF');
  }

});

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Inobrax WebApp to Control Lamp at localhost and port "+ port)
})
