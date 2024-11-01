const express=require('express')
const web=express();
const port=4500;
const cors =require('cors');
const mongoose=require('mongoose');
const foodrouter = require('./Router/foodrouter');
const userrouter = require('./Router/userrouter');
const path =require('path');

web.use(cors({
  origin: [ 'https://admin-mf1y.onrender.com','https://sanjay-adepu-yumio.onrender.com'] 
}));


// Serve static files from the "uploads" directory
web.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//middlewares
web.use(express.json());
web.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

web.use('/food',foodrouter);
web.use('/user',userrouter);





//server connection
web.listen(port,()=>{
  console.log(`server running at ${port}`);
})

//api creation
web.get('/',(req,res)=>{
  
  res.send("Api created");
})

mongoose.connect('mongodb+srv://sanjay:abc1234@cluster0.tldtm.mongodb.net/yumio').then(()=>{
  console.log('mongodb connected succesfully');
}).catch((error)=>{
  console.log(error)
})


