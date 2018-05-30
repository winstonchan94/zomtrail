const userController = require('../controllers/user.ctrl');
const express  = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;

/**
 * get all users
 */
router.route('/users')
  .post(userController.apiPost);

router.route('/users/:userId')
  .get(userController.apiGet)
  .patch(userController.apiUpdate);

router.route('/usersByEmail/:email')
  .get(userController.apiGetByEmail);


module.exports = router;
