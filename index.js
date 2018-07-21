var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var setupAuth = require('./auth');
var port = process.env.PORT || 8080;

require('dotenv').config();

// Connect to the database pointed at in our server environment
mongoose.connect(process.env.MONGODB_SERVER);

var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Use the method set in auth.js to authenticate user
setupAuth(app);

// Serve API assets / ost route file.
app.use(express.static(path.join(__dirname, 'build')));

// Include API routes
app.use('/api/locations', require('./api/locations'));
app.use('/api/validateLocation', require('./api/validateLocation'));

// If none of the above matches, serve public/index.html.
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')));

//heroku will tell us what the port is. PORT var set by heroku
app.listen(port, function() {
    console.log("Server running on " + port);
});
