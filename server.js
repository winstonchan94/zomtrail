const app = require('./app');
const port = process.env.PORT || 3000;

$.getScript( "ajax/test.js", function( data, textStatus, jqxhr ) {
  console.log( data ); // Data returned
  console.log( textStatus ); // Success
  console.log( jqxhr.status ); // 200
  console.log( "Load was performed." );
});

app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
