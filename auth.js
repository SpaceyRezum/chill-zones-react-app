// Require the User model from our API
var User = require('./api/users/model');
var passport = require('passport');
var session = require('express-session');

module.exports = function(app) {
  passport.use(User.createStrategy());

  // Set up serialization and deserialization of users
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  // Allow express session to store cookies and stores secret password in server environment
  app.use(require('express-session')({ secret: process.env.MY_SECRET, resave: false, saveUninitialized: true }));
  // Initialize passport and it's session
  app.use(passport.initialize());
  app.use(passport.session());

  // Implement a login route using passport.authenticate middleware method
  app.post('/api/login', passport.authenticate('local'), function(req, res) {
    res.send(req.user)
  });

  // Implement a signup route
  app.post('/api/signup', function(req, res, next) {
    var user = new User();
    user.email = req.body.email;
    user.name = req.body.name;

    User.register(user, req.body.password, (err) => {
      if (err) { next(err); }
      req.login(user, function(err) {
        if (err) { next(err); }
        res.send(user);
      })
    })
  });

  // Get details on a current user.
  app.get('/api/me', function(req, res) {
    res.send(req.user);
  });
}