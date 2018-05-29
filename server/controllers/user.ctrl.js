const User = require('../models/User');
const bodyParser = require('body-parser');

exports.apiPost = (req, res) => {
  let user = new User();

  Object.assign(user, req.body.user);

  user.save(function(err) {
    if (err) {
      res.send(err);
    } else {
      res.json(user);
    }
  });
};
exports.apiGet = (req, res) => {
  User.findById(req.body.id).exec(function(err, user) {
    if (err) {
      res.send(err);
    } else {
      res.json(user);
    }
  });
};
exports.apiGetByEmail = (req, res) => {
  User.find({email: req.body.email}).exec(function(err, user) {
    if (err) {
      res.send(err);
    } else {
      res.json(user);
    }
  });
};
