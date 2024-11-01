const mongoose= require('mongoose');
const userSchema= new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  cartlist:{
    type:Object,
    default:{}
  }
});
  
module.exports=mongoose.model('usermodel',userSchema);
  
  
  
  
  
  