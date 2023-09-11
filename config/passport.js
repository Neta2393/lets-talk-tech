const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../models'); 

// Configure the local strategy for Passport
passport.use(
  new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
    try {
      const user = await User.findOne({ where: { username } });

      // If user doesn't exist or password is incorrect
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'Incorrect credentials' });
      }

      // Authentication successful
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// Serialize user for session storage
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session storage
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
