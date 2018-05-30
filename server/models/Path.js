
'use strict';
//import dependency
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  filename: String
});

const PointSchema = new Schema({
  latitude: Number,
  longitude: Number,
  address: String,
  images: [ImageSchema],
  description: [String]
});

const StepSchema = new Schema({
  start_point: PointSchema,
  end_point: PointSchema,
  direction: String,
  data_points: [{
    images: [ImageSchema]
  }]
});

const PathSchema = new Schema({
    start_point: PointSchema,
    end_point: PointSchema,
    steps: [StepSchema],
    pathId: Number
  }
);

module.exports = {
  Path: mongoose.model('Path', PathSchema),
  Step: mongoose.model('Step', StepSchema),
  PointO: mongoose.model('PointO', PointSchema),
  Image: mongoose.model('Image', ImageSchema)
};
