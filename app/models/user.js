var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

var path = ('../../db/');
var db = require(path + 'dbconfig.js');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: { type: String, unique: true, maxlength: 100 },
  password: { type: String, maxlength: 100 }
});

userSchema.methods.comparePassword = function(attemptedPassword, cb) {
  // takes in user-entered password and compares with
  // previously stored pw in db, passes boolean to cb
};

userSchema.methods.hashPassword = function() {
  // use promise
  // each time user document is created, call this
  // set the user's pw to the hashed result
};

var User = mongoose.model('User', userSchema);


module.exports = User;

/*******************************************************/

// Old Model

// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function(){
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function(){
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });

// module.exports = User;