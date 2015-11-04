var app = require('./server-config.js');

// if running locally, listening on :1337
var port = process.env.PORT || 1337;

app.listen(port);

console.log('Server now listening on port ' + port);
