const mongoose=require("mongoose");
const orderSchema=new mongoose.Schema({
    date:Date,
    userId:{type: mongoose.Schema.Types.ObjectId,ref:'users'},
    items:Array(mongoose.Schema.Types.Mixed),
    address:mongoose.Schema.Types.Mixed,
    total:Number,
    status:String,
});
const Order=mongoose.model("orders",orderSchema);
module.exports=Order;