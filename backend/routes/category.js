const express=require("express");
const router=express.Router();
const Category=require("../model/category.js")
const {verifyToken,isAdmin}=require("../controler/authorization.js");
router.post("",verifyToken,isAdmin,async (req,res)=>{
    const cat=req.body;
    let category =new Category({
        name:cat.name,
        image:cat.image
    });
    category.save();
     res.send(category.toObject());
})
router.get("",async (req,res)=>{
    let ge=await Category.find();
     res.send(ge.map(c=>c.toObject()));
})
router.get("/:id",async (req,res)=>{
    let id=req.params.id;
    let ge=await Category.findById(id);
    res.send(ge.toObject());
})
router.put("/:id",verifyToken,isAdmin,async (req,res)=>{
    let cat =req.body;
    let id=req.params.id;
    const upd=await Category.findOneAndUpdate({_id:id},cat);
    if(!upd){
        return res.status(404).json({messge:"category not found "});
    }
    res.send({message:"updated"});
})
router.delete("/:id",verifyToken,isAdmin,async (req,res)=>{
    let cat =req.body;
    let id=req.params.id;
    const del=await Category.findOneAndDelete({_id:id});
    if(!del){
        return res.status(404).json({messge:"category not found "});
    }
    res.send({message:"deleted"});
})
module.exports =router;