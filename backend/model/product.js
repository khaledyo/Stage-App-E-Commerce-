const mongoose=require("mongoose");
const { Schema }=mongoose;
const productSchema=new mongoose.Schema({
    name:String,
    description:String,
    Price:Number,
    promo:Number,
    quantity:Number,
    images:Array(String),
    categoryId:{ type: Schema.Types.ObjectId, ref: 'categories' }
})
const Product=mongoose.model("products",productSchema);
module.exports=Product;