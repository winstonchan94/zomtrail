const userController = require('../controllers/user.ctrl');
const express  = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;

/**
 * get all users
 */
router.route('/users')
  .get(userController.apiGet)
  .post(userController.apiPost);

router.route('/usersByEmail')
  .get(userController.apiGetByEmail);

/**
 * add an user
 */
// router
//   .route('/user')
//   .post(data, usercontroller.addUser);
/**
 * get a particlular user
 */
module.exports = router;
