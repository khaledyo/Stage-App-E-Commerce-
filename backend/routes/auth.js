const express=require("express");
const router=express.Router();
const User=require("../model/user.js");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

router.post("/register",async(req,res)=>{
    let model=req.body;
    const hashPassword=await bcrypt.hash(model.password,10);
    if(model.name && model.email && model.password){
        let user=new User({
            name:model.name,
            email:model.email,
            password:hashPassword,
        })
        await user.save();
        res.send({message:"User registered"});
    }else{
        res.status(404).json({message:" provide name,email,password"});
    }
})

router.post("/login", async (req, res) => {
    let model = req.body;
    
    if (model.email && model.password) {
      try {
        const user = await User.findOne({ email: model.email });
        if (!user) {
          return res.status(400).json({ message: "Email or password is incorrect" });
        }
        const isTheSame = await bcrypt.compare(model.password, user.password);
        if (isTheSame) {
          const token = jwt.sign({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          }, "secret", {
            expiresIn: "3h",
          });
          return res.json({
            token,
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
            },
          });
        } else {
          return res.status(400).json({ message: "Email or password is incorrect" });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
      }
    } else {
      return res.status(400).json({ message: "Please provide both email and password" });
    }
  });
 
// Au lieu de require('./config/firebase-adminsdk.json')
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
  })
});
  router.post("/google-login", async (req, res) => {
    try {
      const { token } = req.body; 
      if (!token) {
        return res.status(400).json({ message: "No token provided" });
      }
      const decodedToken = await admin.auth().verifyIdToken(token);
      const { email, name, uid } = decodedToken;
      let user = await User.findOne({ email });
      if (!user) {
        user = new User({
          name: name || "Google User",
          email,
          password:null, 
        });
        await user.save();
      }
      const jwtToken = jwt.sign(
        {
          id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        "secret",
        { expiresIn: "3h" }
      );
      res.json({
        token: jwtToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        },
      });
    } catch (error) {
      console.error("Error verifying Firebase token:", error);
      res.status(401).json({ message: "Invalid Google token" });
    }
  });
module.exports=router;