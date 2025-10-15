const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'layout'); // This uses views/layout.ejs

// Load data
const items = JSON.parse(fs.readFileSync('./data/items.json', 'utf8'));

// Routes
app.get('/', (req, res) => {
  res.render('pages/home', { title: 'Home | Arizona Beverages' });
});

app.get('/about', (req, res) => {
  res.render('pages/about', { title: 'About | Arizona Beverages' });
});
// NEW ROUTES
app.get('/services', (req, res) => {
  res.render('pages/services', { title: 'Our Services | Arizona Beverages' });
});

app.get('/blog', (req, res) => {
  res.render('pages/blog', { title: 'Blog | Arizona Beverages' });
});


app.get('/items', (req, res) => {
  res.render('pages/items', { title: 'Our Beverages', items });
});

app.get('/items/:slug', (req, res) => {
  const item = items.find(i => i.slug === req.params.slug);
  if (item) {
    res.render('pages/item-detail', { title: item.name, item });
  } else {
    res.status(404).render('error', { title: 'Not Found' });
  }
});

app.get('/contact', (req, res) => {
  res.render('pages/contact', { title: 'Contact Us | Arizona Beverages', message: null });
});

app.post('/contact', (req, res) => {
  console.log('Form data received:', req.body);
  res.render('pages/contact', { title: 'Contact Us | Arizona Beverages', message: 'Thank you for your message!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('pages/error', { title: 'Not Found' });
});

// 500 handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('pages/error', { title: 'Server Error' });
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));

