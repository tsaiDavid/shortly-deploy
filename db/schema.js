var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlSchema = new Schema({
  // only set url to 255 to mimic original config (sqlite3)
  url: { type: String, maxlength: 255 },
  base_url: String,
  code: String, 
  title: String,
  visits: Number,
  timestamps: Date,
  // created at?
});

var userSchema = new Schema({
  username: { type: String, unique: true, maxlength: 100 },
  password: { type: String, maxlength: 100 }
});

module.exports.urlSchema = urlSchema;
module.exports.userSchema = userSchema;
