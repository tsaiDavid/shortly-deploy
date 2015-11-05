var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');
var Promise = require('bluebird');


// MongoDB
var db = require('../dbconfig.js');
var User = require('../app/models/user');
var Link = require('../app/models/link');
// var Users = require('../app/collections/users');
// var Links = require('../app/collections/links');

exports.renderIndex = function(req, res) {
  res.render('index');
};

exports.signupUserForm = function(req, res) {
  res.render('signup');
};

exports.loginUserForm = function(req, res) {
  res.render('login');
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function() {
    res.redirect('/login');
  });
};

exports.fetchLinks = function(req, res) {
  Link.find({}, function(err, links) {
    if (err) {
      console.log('Error while fetching links: ', err);
    } else {
      console.log('***** LINKS *****: ', links);
      res.send(200, links);
    }
  })
};

exports.saveLink = function(req, res) {
  var uri = req.body.url;

  if (!util.isValidUrl(uri)) {
    console.log('Not a valid url: ', uri);
    return res.send(404);
  }

  Link.findOne({ 'url': uri }, 'url code', function(err, link) {
    // if link doesn't exist, create
    if (link === null) {
      // created new instance of Link
      var newLink = new Link({
        'url': uri ,
        'base_url': req.headers.origin,
        'visits': 0
      });
      // hash link
      newLink.hashURL(function() {
        util.getUrlTitle(uri, function(err, title) {
          if (err) {
            console.log('Error reading URL heading: ', err);
            return res.send(404);
          // if no errors, give Link document the title
          } else {
            newLink.title = title;
            // saving new Link to MDB
            newLink.save(function(err) {
              if (err) {
                console.log('Error saving Link: ', err);
              } else {
                res.send(200, newLink);
              }
            });
          }
        });
      });
    } else {
      res.send(200, link.code);
    }
  })
};

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  // locate user within User model
  User.findOne({ 'username': username }, 'username password',
    function(err, user) {
      // if MDB returns null (user doesn't exist)
      if (user === null) {
        console.log('User does not exist!');
        res.redirect('/login');
      // if user is found, compare using bcrypt inside userSchema method
      } else {
        user.comparePassword(password, function(err, match) {
          if (err) {
            console.log('Error from bCrypt: ', err);
          } else if (match) {
            util.createSession(req, res, user);
          } else {
            res.redirect('/login');
          }
        })
      }
    }
  );
};

exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  // locate user within User model, need to specify selected params
  User.findOne({ 'username': username }, 'username',
    // since MDB will return null or an actual User
    function(err, user) {
      // if the user doesn't exist, we create
      if (user === null) {
        // create new instance of User
        var newUser = new User({ 'username': username, 'password': password });
        // hash the user-provided password using the userSchema method
        newUser.hashPassword().then(function(err) {
          // after completing the hashing, handle errors
          if (err) { console.log('Error saving new User: ', err); }
          // if no errors, save new user into MDB
          else {
            newUser.save(function(err) {
              if (err) {
                console.log('Error saving new User: ', err);
              } else {
                util.createSession(req, res, user);
                res.redirect('/');
              }
            });
          }
        })
        // if the user already exists
      } else {
        console.log('Account already exists.');
        res.redirect('/signup');
      }
    }
  );
};

exports.navToLink = function(req, res) {
  console.log('navToLink, req.params: ', req.params);

  Link.findOne({ 'code': req.params[0] }, 'visits url', function(err, link) {
    // if we can't find the link in our db
    if (link === null) {
      res.redirect('/');
    } else {
      console.log('LINK DUDE ', link);
      link.visits++;
      link.save(function(err) {
        if (err) {
          console.log('Error updating link visits: ', err);
        } else {
          // res.writeHead('/' + link.code);
          res.redirect(link.url);
        }
      });
    }
  });
};
