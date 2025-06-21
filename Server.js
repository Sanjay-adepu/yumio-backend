const express = require('express');
const web = express();
const port = 4500;
const cors = require('cors');
const mongoose = require('mongoose');
const foodrouter = require('./Router/foodrouter');
const userrouter = require('./Router/userrouter');
const path = require('path');

// Middleware setup
web.use(cors({
  origin: ['https://admin-mf1y.onrender.com', 'https://sanjay-adepu-yumio.onrender.com']
}));
web.use('/uploads', express.static(path.join(__dirname, 'uploads')));
web.use(express.json());
web.use(express.urlencoded({ extended: true }));
web.use('/food', foodrouter);
web.use('/user', userrouter);

// Root API route
web.get('/', (req, res) => {
  res.send("API created");
});

// Connect to MongoDB FIRST, then start server
mongoose.connect('mongodb+srv://sanjay:abc1234@cluster0.tldtm.mongodb.net/yumio', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected successfully');
  
  // Only start the server after successful DB connection
  web.listen(port, () => {
    console.log(`Server running at port ${port}`);
  });
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// For Vercel deployment
module.exports = web;