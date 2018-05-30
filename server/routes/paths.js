const paths = require('../controllers/path.ctrl');
const express  = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;

router.route('/paths')
  .get(paths.apiGetAll)
  .post(paths.apiPost)
  .delete(paths.apiDeleteAll);


router.route('/paths/:pathId')
  .get(paths.apiGetOne)
  .delete(paths.apiDelete)
  .patch(paths.apiUpdate);

//
// module.exports = function(app, db) {
//   app.post('/paths', (req, res) => {
//     db.collection('paths').insert(req.body, (err, result) => {
//       if (err) {
//         res.send({ 'error': 'An error has occurred' });
//       } else {
//         res.send(result.ops[0]);
//       }
//     });
//   });
//   app.get('/paths', (req, res) => {
//     db.collection("/paths").find({}).toArray(function(err, result) {
//       if (err) throw err;
//       res.send(result);
//     });
//   });
// };

module.exports = router;
