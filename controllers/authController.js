const passport = require('../config/passport');
const db = require('../models');
const bcrypt = require('bcrypt');

const authController = {
  renderLogin: (req, res) => {
    res.render('login');
  },

  authenticate: passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true,
  }),

  renderSignup: (req, res) => {
    res.render('signup');
  },

  createUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      const existingUser = await db.User.findOne({ where: { email } });

      if (existingUser) {
        return res.render('signup', { message: 'Email is already registered' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await db.User.create({ email, password: hashedPassword });

      res.redirect('/login');
    } catch (error) {
      console.error(error);
      res.render('signup', { message: 'An error occurred during signup' });
    }
  },
};

module.exports = authController;
