const foodcontroller = require('../Controller/foodcontroller');
const express = require('express');
const multer = require('multer');
const route=express.Router();

//creating storage for images


const storage = multer.diskStorage({
    destination: 'uploads', // Ensure this directory exists
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });


route.post('/addfood',upload.single('image'),foodcontroller.addfood);
route.get('/getfood',foodcontroller.getfood);
route.post('/removefood',foodcontroller.removefood);

module.exports=route;