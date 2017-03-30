var express = require('express');
var app = express();

require('dotenv').config();
console.log(process.env.IT_WORKS);

var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');

var mongoose = require('mongoose');

// TODO: Enter a DB Name for your project
mongoose.connect(process.env.MONGODB_SERVER);

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
app.listen(precess.env.PORT || 8080);
