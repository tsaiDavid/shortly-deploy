var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

var db = require('../../dbconfig.js');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: { type: String, unique: true, maxlength: 100 },
  password: { type: String, maxlength: 100 }
});

userSchema.methods.comparePassword = function(attemptedPassword, cb) {
  bcrypt.compare(attemptedPassword, this.password, function(err, res) {
    if (err) {
      cb(err);
    } else if (res === true) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  })
};

userSchema.methods.hashPassword = function() {
  var cipher = Promise.promisify(bcrypt.hash);
    return cipher(this.password, null, null).bind(this)
      .then(function(hash) {
        this.password = hash;
      });
};

var User = mongoose.model('User', userSchema);

module.exports = User;