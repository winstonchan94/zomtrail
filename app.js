const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./server/routes/');
const cors = require('cors');
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// MongoDB
const url = process.env.MONGODB_URI ||
  "mongodb://localhost:27017/medium";

/** connect to MongoDB datastore */
try {
  mongoose.connect(url, {
    //useMongoClient: true
  });
} catch (error) {
  console.log(error);
}

/**
 * API
 */
 /** set up routes {API Endpoints} */
 routes(router);
 app.use('/api', router);

// app.get('/api', function(req, res, next) {
//     let data = {
//         message: 'Hello World!'
//     };
//     res.status(200).send(data);
// });
// app.post('/api', function(req, res, next) {
//     let data = req.body;
//     console.log(req.body);
//     // query a database and save data
//     res.status(200).send(data);
// });

/**
 * STATIC FILES
 */
app.use('/', express.static('public'));

/** set up middlewares */
app.use(cors());
app.use(bodyParser.json());
// Default every route except the above to serve the index.html
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

module.exports = app;
