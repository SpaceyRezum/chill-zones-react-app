var express = require('express');
var app = express();
var mongoose = require('mongoose');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var setupAuth = require('./auth');

require('dotenv').config();

// Connect to the database pointed at in our server environment
mongoose.connect(process.env.MONGODB_SERVER);

// Use the method set in auth.js to authenticate user
setupAuth(app);

var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Serve bundle.js
app.use(webpackMiddleware(webpack(require('./webpack.config.js'))));

// Serve API assets / ost route file.
app.use(express.static('public'));

// Include API routes
app.use('/api/locations', require('./api/locations'));

// If none of the above matches, serve public/index.html.
app.get('*', (req, res) => res.sendFile(__dirname + '/public/index.html'))

//heroku will tell us what the port is. PORT var set by heroku
app.listen(process.env.PORT || 8080);
