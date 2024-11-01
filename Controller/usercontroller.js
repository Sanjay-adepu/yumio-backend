const usermodel=require('../Model/usermodel');
const jwt=require('jsonwebtoken');
const validator =require('validator');
const bcrypt=require('bcryptjs');




// registration for user 
const Register=async(req,res)=>{
  const {name,email,password} =req.body;
  console.log(req.body);
  try{
    const user = await usermodel.findOne({email});
    if(user){
      return res.json({success:false,message:"user already exist "})
    }
    if(!validator.isEmail(email)){
      return res.json({success:false,message:'email is not in proper format'})
    }
    const hashpassword= await bcrypt.hash(password,10);
  
const userdata =await usermodel({
  name,
  email,
  password:hashpassword
});
await userdata.save();
console.log(userdata);
res.status(200).json({success:true,message:'user successfully registed'})
  }catch(error){
    console.log(error);
    return res.json({success:false,message:'registration failed'});
    
    
  }
};

// login for user 
const Login = async (req, res) => {
  secretecode="yumio";
  const { email, password } = req.body;

  try {
    const user = await usermodel.findOne({ email });
    
    if (user && (await bcrypt.compare(password, user.password))) {
      // Generate token for user
       const token=jwt.sign({userid:user._id},secretecode,{expiresIn:"1h"});
       console.log(token);
       

      // Send cart data (if any) along with login response
      return res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        cartlist: user.cartlist || {},  // Send cartlist (empty if no cart)
      });
    } else {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, message: "Server error" });
    console.error(error)
  }
};



// Update Cart Controller
const updateCart = async (req, res) => {
  const userId = req.user.userid;  // Get user ID from the token
  const { cartlist } = req.body;  // Get the updated cart

  try {
    await usermodel.findByIdAndUpdate(userId, { cartlist });  // Update the cartlist
    return res.status(200).json({ success: true, message: "Cart updated successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error updating cart" });
  }
};

module.exports = { Register, Login, updateCart };  // Export updateCart


