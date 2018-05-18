const app = require('./app');
const port = 3000 || process.env.PORT;

app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
