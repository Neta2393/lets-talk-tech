const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection'); // Sequelize configuration
const passport = require('passport');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session
app.use(session({
  secret: 'your_secret_here',
  resave: false,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Handlebars setup
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Routes
require('./controllers/authController')(app);
require('./controllers/blogController')(app);
require('./controllers/indexController')(app);

// Sync Sequelize models and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
