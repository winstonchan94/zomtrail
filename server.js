const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
// const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const routes = require('./server/routes/');
const cors = require('cors');
const router = express.Router();
const axios = require('axios');
const port = process.env.PORT || 3000;

const pathRouter = require("./server/routes/paths");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// MongoDB
const db = process.env.MONGODB_URI || require('./config/db');

/**
 * API
 */
 /** set up routes {API Endpoints} */
// routes(router);
// app.use('/api', router);
app.use('/api', pathRouter);

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

// force user to use https
app.use (function (req, res, next) {
  if (req.secure || req.headers.host === 'localhost:3000') {
    // request was via https, so do no special handling
    next();
  } else {
    // request was via http, so redirect to https
    res.redirect('https://' + req.headers.host + req.url);
  }
});

/**
 * STATIC FILES
 */
app.use('/', express.static('public'));

/** set up middlewares */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Default every route except the above to serve the index.html
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// MongoClient.connect(db, (err, database) => {
//   if (err) return console.log(err);
//   require('./server/routes')(app, database);
// });
mongoose.connect(db);
const mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'MongoDB connection error:'));

// configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
