const express=require("express");
const router=express.Router();
const Panier=require("../model/Panier.js");
const {verifyToken,isAdmin}=require("../controler/authorization.js");
router.post("/:id", verifyToken, async (req, res) => {
    const userId = req.user.id; 
    const productId = req.params.id;
    const quantity = req.body.quantity; 
    let product = await Panier.findOne({ userId, productId });
    if (product) {
        product.quantity = quantity;
    } else {
        product = new Panier({ userId, productId, quantity });
    }
    await product.save();
    res.send(product.toObject());
    });


router.delete("/:id",verifyToken,async (req,res)=>{
    const userId=req.user.id;
    const productId=req.params.id;
    let product=await Panier.findOneAndDelete({userId:userId,productId:productId});
    res.send({message:"deleted"});
})
router.get("",verifyToken,async (req,res)=>{
    const userId=req.user.id;
    const products=await Panier.find({userId:userId}).populate("productId");
    res.send( products.map((x)=>{
        return {quantity:x.quantity,product:x.productId};
    }));
})
module.exports=router;