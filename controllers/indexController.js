module.exports = (app) => {
    // Homepage route
    app.get('/', (req, res) => {
      // Render the homepage view
      res.render('homepage', { isAuthenticated: req.isAuthenticated() });
    });
  
    // Signup route
    app.get('/signup', (req, res) => {
      // Render the signup view
      res.render('signup', { isAuthenticated: req.isAuthenticated() });
    });
  
    // Login route
    app.get('/login', (req, res) => {
      // Render the login view
      res.render('login', { isAuthenticated: req.isAuthenticated() });
    });
  
    // Redirect authenticated users to the dashboard
    app.get('/dashboard', (req, res) => {
      if (req.isAuthenticated()) {
        res.redirect('/dashboard');
      } else {
        res.redirect('/login'); // Redirect to login if not authenticated
      }
    });
  };
  