// db.js
var mongoose = require('mongoose');
var db_url = 'mongodb://localhost:27017/todo';

mongoose.connect(db_url, function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  else{
    console.log('connected to DB');
  }
});
