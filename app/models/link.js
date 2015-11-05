var path = ('../../db/');

var db = require(path + 'dbconfig.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var linkSchema = new Schema({
  // only set url to 255 to mimic original config (sqlite3)
  url: { type: String, maxlength: 255 },
  base_url: String,
  code: String, 
  title: String,
  visits: Number,
  timestamps: Date,
});

linkSchema.methods.someFunction = function() {
  
};

var Link = mongoose.model('Link', linkSchema);

module.exports = Link;

/*****************************************/

// // Old Model

// var db = require('../config');
// var crypto = require('crypto');

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function(){
//     this.on('creating', function(model, attrs, options){
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });
