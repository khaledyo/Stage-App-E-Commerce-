const mongoose=require("mongoose");
const { Schema }=mongoose;
const panierSchema=new mongoose.Schema({
    userId:{type:Schema.Types.ObjectId,ref:'users'},
    productId:{type:Schema.Types.ObjectId,ref:'products'},
    quantity:Number
})
const Panier=mongoose.model("Panier",panierSchema);
module.exports=Panier;