
const foodmodel= require('../Model/foodmodel');
const fs =require('fs');


// adding food list
const addfood = async(req, res) => {
  const { name, price, description, category } = req.body; // image won't be in req.body
  
  console.log(req.category);
  
  
  console.log("req.file:", req.file); // For file upload
console.log("req.body:", req.body); // For form data
  
  try {
    let file_name = req.file ? req.file.filename : null; // multer will put the image file in req.file
      
    // Ensure category is passed correctly
    if (!category) {
      return res.status(400).json("error: 'category' is required");
    }

    const fooddata = new foodmodel({
      name,
      price,
      description,
      image: file_name, // store the uploaded file's name in the database
      category
    });

    await fooddata.save();
    res.status(201).json({success:true});
    console.log("data stored on the mongodb database");
    console.log(fooddata);

  } catch (error) {
    console.log(error);
    res.status(500).json({success:true},"error: error occurred in the catch block");
  }
};


//getting food list
const getfood = async(req,res)=>{
  const foodlist = await foodmodel.find({});
  try{
    
    res.status(201).json({
         success:true,
      message:"foodlist getting on the server",  
      data:foodlist
    });
    console.log(foodlist);
  }catch(error){
    console.error(error);
    res.status(500).json({success:false,message:"food list not found"})
  }
}


//remove foodlist 

const removefood = async (req, res) => {
  try {
    // Find the food item by ID
    const removeitem = await foodmodel.findById(req.body.id);
    console.log(req.body.id);

    // Check if the item exists
    if (!removeitem) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }

    // Remove the associated image file if it exists
    if (removeitem.image) {
      fs.unlink(`uploads/${removeitem.image}`, (err) => {
        if (err) {
          console.error("Error removing image:", err);
        }
      });
    }

    // Remove the food item from the database
    await foodmodel.findByIdAndDelete(req.body.id);

    res.status(200).json({ success: true, message: "Food item has been removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: "An error occurred while removing the food item" });
    console.error(error);
  }
};


module.exports={addfood,getfood,removefood}