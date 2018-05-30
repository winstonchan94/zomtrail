const pathModel = require('../models/Path');
const Path = pathModel.Path;
const PointO = pathModel.PointO;
const Step = pathModel.Step;
const bodyParser = require('body-parser');

exports.apiPost = (req, res) => {
  let path = new Path();

  Object.assign(path, req.body.path);
  let steps = path.steps;
  path.save(function(err) {
    if (err) {
      res.send(err);
    } else {
      res.send(path);
    }
  });
};
exports.apiGetOne = (req, res) => {
  Path.find({pathId: req.params.pathId}, function(err, path) {
    if (err) {
      res.send(err);
    } else {
      res.send(path);
    }
  });
};
exports.apiUpdate = (req, res) => {
  Path.findOneAndUpdate({pathId: req.params.pathId}, req.body.path,
    function(err, path) {
      if (err) {
        res.send(err);
      } else {
        res.send(path);
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

exports.apiDeleteAll = function(req, res) {
  Path.find({}, function(err, paths) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      paths.forEach((path) => {
        Path.findByIdAndRemove(path._id, function() {});
      });
      res.json({ message: 'All paths has been deleted' });
    }
  });
};
