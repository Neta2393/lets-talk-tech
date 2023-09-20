const router = require('express').Router();
const { Blog, User } = require('../models');

// Home route to display all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      order: [['createdAt', 'DESC']],
      include: User, 
    });

    res.render('homepage', { blogs }); // Render a homepage view with the list of blogs
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
