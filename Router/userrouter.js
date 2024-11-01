const { Register, Login, updateCart } = require('../Controller/usercontroller');
const express = require('express');
const route = express.Router();
const verifyToken = require('../Middleware/verifyToken'); // Import token verification middleware

// User registration and login routes
route.post('/register', Register);
route.post('/login', Login);

// Cart update route (protected by the verifyToken middleware)
route.put('/update-cart', verifyToken, updateCart);

module.exports = route;