const express =require("express");
const mongoose=require("mongoose");
const app=express();
require('dotenv').config();
const cors=require("cors");
const port=process.env.PORT ;
const categoryRoutes=require("./routes/category");
const productRoutes=require("./routes/product");
const authRoutes=require("./routes/auth");
const panierRoutes = require("./routes/panier.js");
const orderRoutes=require("./routes/order.js");
const emailRoutes=require("./routes/email.js");
app.use(cors());

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("server running");
})
app.use("/panier", panierRoutes);
app.use("/order", orderRoutes);
app.use("/category",categoryRoutes);
app.use("/product",productRoutes);
app.use("/auth",authRoutes);
app.use("/send-email",emailRoutes);

async function connectDB(){
    await mongoose.connect(process.env.DATABASE_URL,{
        dbName:'e-commerce',
    });
   
    console.log("mongodb connected");
}
connectDB().catch((err)=>{
    console.error(err);
})

app.listen(port,()=>{
    console.log("server run on port",port);
})