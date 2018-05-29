const User = require('../models/User');

exports.apiGET = (req, res) => {
  User.find({});
};
