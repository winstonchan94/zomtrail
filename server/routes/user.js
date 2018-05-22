const usercontroller = require('./../controllers/user.ctrl');

module.exports = (router) => {
    /**
     * get all users
     */
    router
      .route('/users')
      .get(usercontroller.getAll);
    /**
     * add an user
     */
    // router
    //   .route('/user')
    //   .post(data, usercontroller.addUser);
    /**
     * get a particlular user
     */
    router
      .route('/user/:id')
      .get(usercontroller.getArticle);
};
