const { User } = require('../models');
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (app) => {
  // Passport configuration
  passport.use(new LocalStrategy(
    {
      usernameField: 'username'
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.checkPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  ));

  // Serialize user
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  // Login route
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  }));

  // Logout route
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};
