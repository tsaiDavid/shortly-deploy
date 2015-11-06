var mongoose = require('mongoose');

var connectionString = process.env.CUSTOMCONNSTR_MONGOLAB_URI || 'mongodb://localhost/shortlydb';

mongoose.connect(connectionString);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));

db.once('open', function(callback) {
  // this will be called once the db connection is opened
})

module.exports = db;
