var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var users = new Schema({
  username: {
    type: String,
    required: true,
    index: {unique: true}
  },
  password: {
    type: String,
    required: true
  }
});

// hash password before saving a new user
users.pre('save', function(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });
});

// compare password
users.methods.comparePassword = function(attemptedPassword, cb) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    cb(isMatch);
  });
};

var User = mongoose.model('User', users);

module.exports = User;
