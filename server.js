// Import dependencies
const express = require('express');
const path = require('path');

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files (CSS, images, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to handle form submissions
app.use(express.urlencoded({ extended: true }));

// ====== ROUTES (your website pages) ======

// Home
app.get('/', (req, res) => {
  res.render('pages/home', { title: 'Home' });
});

// About
app.get('/about', (req, res) => {
  res.render('pages/about', { title: 'About' });
});

// Services
app.get('/services', (req, res) => {
  res.render('pages/services', { title: 'Services' });
});

// Blog
app.get('/blog', (req, res) => {
  res.render('pages/blog', { title: 'Blog' });
});

// Contact (GET)
app.get('/contact', (req, res) => {
  res.render('pages/contact', { title: 'Contact', message: null });
});

// Contact (POST)
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('New contact:', name, email, message);
  res.render('pages/contact', { title: 'Contact', message: 'Thanks for reaching out!' });
});
// Load JSON data
const fs = require('fs');
const items = JSON.parse(fs.readFileSync('./data/items.json', 'utf8'));

// Collection page (list of all items)
app.get('/items', (req, res) => {
  res.render('pages/items', { title: 'Collection', items });
});

// Detail page (single item)
app.get('/items/:slug', (req, res) => {
  const item = items.find(i => i.slug === req.params.slug);
  if (!item) {
    return res.status(404).render('pages/error', { title: 'Item Not Found' });
  }
  res.render('pages/item-detail', { title: item.title, item });
});


// ====== ERROR HANDLING ======

// 404 - Page Not Found
app.use((req, res) => {
  res.status(404).render('pages/error', { title: 'Not Found' });
});

// 500 - Server Error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('pages/error', { title: 'Server Error' });
});

// ====== START SERVER ======
const PORT = process.env.PORT || 3000; // You can change 3000 to 505 if you want
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

