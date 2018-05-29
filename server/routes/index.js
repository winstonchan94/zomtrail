const pathRoutes = require('./paths');
module.exports = (app, db) => {
  pathRoutes(app, db);
};
