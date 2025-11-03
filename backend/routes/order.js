const express=require("express");
const router=express.Router();

const Order=require("../model/order.js");
const {verifyToken,isAdmin}=require("../controler/authorization.js");
const Panier = require("../model/Panier.js");

router.post("",verifyToken,async (req,res)=>{
    const userId=req.user.id;
    const order=req.body;
    const newOrder=new Order({
        ...order,
        userId:userId,
        status:"inprogress",
    })
    await newOrder.save();
    await Panier.deleteMany({userId:userId});
    res.send({message:"order created"});
})
router.get("",verifyToken,isAdmin,async (req,res)=>{
    let orders=await Order.find();
    res.send(orders.map((x)=>x.toObject()));
});
router.put("/:id",verifyToken,isAdmin,async (req,res)=>{
    const id=req.params.id;
    const status=req.body.status;
    await Order.findByIdAndUpdate(id,{
        status:status
    });
    res.send({message:"updated"});
});


module.exports =router;