const express=require("express");
const router=express.Router();
const Product=require("../model/product.js");
const {verifyToken,isAdmin}=require("../controler/authorization.js");
router.post("/",verifyToken,isAdmin,async(req,res)=>{
    let model=req.body;
    let prod=new Product({
        ...model
    })
    await prod.save();
    res.status(201).json(prod);
})
router.get("/",async(req,res)=>{
    const prod=await Product.find();
    res.send(prod.map(x=>x.toObject()));
})
router.get("/:id",async(req,res)=>{
    const id=req.params.id;
    let prod=await Product.findById(id);
    res.send(prod.toObject());
})
router.put("/:id",verifyToken,isAdmin,async(req,res)=>{
    let model=req.body;
    let id=req.params.id;
    const prod=await Product.findByIdAndUpdate(id,model);
    if(!prod){
        res.status(404).json({message:"product not found "})
    }
    res.send({message:"updated"});
})
router.delete("/:id",verifyToken,isAdmin,async(req,res)=>{
    let id=req.params.id;
    const prod=await Product.findByIdAndDelete(id);
    if(!prod){
        res.status(404).json({message:"product not found "})
    }
    res.send({message:"deleted"});
})
module.exports =router;