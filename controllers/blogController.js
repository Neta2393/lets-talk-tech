const db = require('../models');

const blogController = {
  getAllBlogs: async (req, res) => {
    try {
      const blogs = await db.Blog.findAll({
        order: [['createdAt', 'DESC']],
        include: db.User, 
      });

      res.render('blogs', { blogs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getBlogById: async (req, res) => {
    const { id } = req.params;

    try {
      const blog = await db.Blog.findByPk(id, {
        include: db.User, 
      });

      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }

      res.render('blog', { blog });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  createBlog: async (req, res) => {
    const { title, content } = req.body;
    const authorId = req.user.id; 

    try {
      const newBlog = await db.Blog.create({ title, content, authorId });

      res.status(201).json(newBlog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  updateBlog: async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
      const blog = await db.Blog.findByPk(id);

      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }

      blog.title = title;
      blog.content = content;
      await blog.save();

      res.status(200).json(blog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  deleteBlog: async (req, res) => {
    const { id } = req.params;

    try {
      const blog = await db.Blog.findByPk(id);

      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }

      await blog.destroy();

      res.status(204).send(); // No content after successful deletion
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = blogController;
