const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const passport = require('passport'); // Import passport module

// User registration route
router.post('/register', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.login(newUser, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while logging in.' });
        return;
      }
      res.json({ message: 'Registration successful!', user: newUser });
    });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// User login route
router.post('/login', passport.authenticate('local'), (req, res) => {
  // Successful login
  res.json({ message: 'Login successful!', user: req.user });
});

// User logout route
router.post('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logout successful!' });
});

module.exports = router;
