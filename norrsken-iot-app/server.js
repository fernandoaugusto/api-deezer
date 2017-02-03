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

app.post('/names', function(req, res) {

  hello_id = req.body.hello_id;

  var postData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name
  };

  exec = firebase.database().ref('names/'+ hello_id).set(postData);

  if (exec) {
    res.send('POST - Data was inserted in db');
  }else{
    res.send('POST - Not inserted in db');
  }

});

app.get('/names', function(req, res) {
  res.send('GET - Hello ');
});

app.get('/names/:id', function(req, res) {

  exec = firebase.database().ref('/names/' + req.params.id).once('value').then(function(snapshot) {
    var first_name = snapshot.val().first_name;
    var last_name = snapshot.val().last_name;

    if (exec) {
      res.send('GET - Hello ' + first_name + ' ' + last_name);
    }else {
      res.send('GET - Could not read date');
    }
    
  });

});

app.delete('/names', function (req, res) {
   console.log("Got a DELETE request for /names");
   res.send('Hello DELETE');
})

var server = app.listen(8081, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
