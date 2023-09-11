const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('passport'); // Import passport module
const LocalStrategy = require('passport-local').Strategy; // Import Local Strategy for authentication
const User = require('./models/User'); // Import your User model 

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'Neta is Cool',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
}));
app.use(passport.initialize()); // Initialize passport
app.use(passport.session()); // Initialize passport session

// Passport Local Strategy Configuration
passport.use(new LocalStrategy(
  {
    usernameField: 'username', 
    passwordField: 'password',
  },
  async (username, password, done) => {
    try {
      const user = await User.findOne({ where: { username } });

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      const validPassword = user.checkPassword(password);

      if (!validPassword) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Routes
//app.use(routes);

// Set up Handlebars as the view engine
app.engine('handlebars', exphbs.create({ helpers }).engine);
app.set('view engine', 'handlebars');

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace

  // Respond with an appropriate error message or status code
  res.status(500).send('Something went wrong');
});

// Turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}/`));
});

//Server.js