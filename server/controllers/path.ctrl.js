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
  // let point1 = new PointO();
  // let point2 = new PointO();
  // let step1 = new Step();

  Object.assign(path, req.body.path);
  let steps = path.steps;
  // console.log(steps);
  // console.log(path);

  // point1.discription = ['Balboa High School'];
  // point2.description = ['South San Francisco Opera House'];
  //
  // path.start_point = point1;
  // path.end_point = point2;
  //
  // step1.start_point = point1;
  // step1.end_point = point2;
  //
  // path.steps.push(step1);

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
