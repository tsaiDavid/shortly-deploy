var crypto = require('crypto');
var db = require('../../dbconfig.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var linkSchema = new Schema({
  // only set url to 255 to mimic original config (sqlite3)
  url: { type: String, maxlength: 255 },
  base_url: String,
  code: { type: String, unique: true },
  title: String,
  visits: Number,
  timestamps: Date,
});

linkSchema.methods.hashURL = function(cb) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0,5);
  cb()
};

var Link = mongoose.model('Link', linkSchema);

module.exports = Link;
