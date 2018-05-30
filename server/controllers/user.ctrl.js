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
exports.apiGet = (req, res) => {
  User.findById(req.params.id, function(err, user) {
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
