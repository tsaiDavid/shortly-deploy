var mongoose = require('mongoose');
//Connecting to azure for production?
mongoose.connect('mongodb://localhost/shortlydb');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));

db.once('open', function(callback) {
  // this will be called once the db connection is opened
})

module.exports = db;
