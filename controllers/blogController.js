const { Post, Comment, User } = require('../models');

module.exports = (app) => {
  // Create a new post
  app.post('/post/create', async (req, res) => {
    try {
      if (req.isAuthenticated()) {
        const userId = req.user.id;
        await Post.create({
          title: req.body.title,
          content: req.body.content,
          user_id: userId
        });
        res.redirect('/dashboard');
      } else {
        res.redirect('/login'); // Redirect to login if not authenticated
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while creating the post.');
    }
  });

  // Edit a post
  app.get('/post/edit/:id', async (req, res) => {
    try {
      if (req.isAuthenticated()) {
        const postId = req.params.id;
        const userId = req.user.id;
        const post = await Post.findOne({ where: { id: postId, user_id: userId } });
        if (!post) {
          return res.status(404).send('Post not found.');
        }
        res.render('edit-post', { isAuthenticated: true, post });
      } else {
        res.redirect('/login'); // Redirect to login if not authenticated
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while fetching the post.');
    }
  });

  // Update a post
  app.post('/post/update/:id', async (req, res) => {
    try {
      if (req.isAuthenticated()) {
        const postId = req.params.id;
        const userId = req.user.id;
        await Post.update(
          { title: req.body.title, content: req.body.content },
          { where: { id: postId, user_id: userId } }
        );
        res.redirect('/dashboard');
      } else {
        res.redirect('/login'); // Redirect to login if not authenticated
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while updating the post.');
    }
  });

  // Delete a post
  app.get('/post/delete/:id', async (req, res) => {
    try {
      if (req.isAuthenticated()) {
        const postId = req.params.id;
        const userId = req.user.id;
        await Post.destroy({ where: { id: postId, user_id: userId } });
        res.redirect('/dashboard');
      } else {
        res.redirect('/login'); // Redirect to login if not authenticated
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while deleting the post.');
    }
  });
};
