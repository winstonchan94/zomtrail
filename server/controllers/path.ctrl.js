const pathModel = require('../models/Path');
const Path = pathModel.Path;
const PointO = pathModel.PointO;
const Step = pathModel.Step;
const bodyParser = require('body-parser');

// exports.apiGetPath = (req, res) => {
//   const path_id = req.params.path_id;
//
// };
exports.apiPost = (req, res) => {
  let path = new Path();

  Object.assign(path, req.body.path);

  path.save(function(err) {
    if (err) {
      res.send(err);
    } else {
      res.json(path);
    }
  });
};

exports.apiGetAll = function(req, res) {
  Path.find().sort('updatedAt')
      .limit(20)
      .exec(function(err, paths) {
    if (err) {
      res.send(err);
    } else {
      //responds with a json object of our database teams.
      res.json(paths);
    }
  });
};

exports.apiDelete = function(req, res) {
  Path.findByIdAndRemove(req.params.path_id, function(err, path) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json({ message: 'Path has been deleted' });
    }
  });
};
