const User = require('../models/User');
const bodyParser = require('body-parser');

exports.apiPost = (req, res) => {
  let user = new User();
  Object.assign(user, req.body.user);

  user.save(function(err) {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  });
};
exports.apiUpdate = (req, res) => {
  User.findOneAndUpdate({ _id: req.params.userId }, req.body.user,
    function(err, user) {
      if (err) {
        res.send(err);
      } else {
        res.send(user);
      }
    });
};

exports.apiGetHighScorers = (req, res) => {
  User.find({}).sort( { score: -1 } )
    .then(users => res.send(users));
};

exports.apiGet = (req, res) => {
  User.findById(req.params.userId, function(err, user) {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  });
};
exports.apiGetByEmail = (req, res) => {
  User.find({email: req.params.email}, function(err, user) {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  });
};
