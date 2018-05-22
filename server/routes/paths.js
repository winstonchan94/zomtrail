var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {

  app.post('/paths', (req, res) => {
    db.collection('paths').insert(req.body, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
  app.get('/paths', (req, res) => {
    db.collection("/paths").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
    });
  });
};
