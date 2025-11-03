
const express = require("express");
const router = express.Router();
require('dotenv').config();
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  },
});
router.post("/", (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Veuillez fournir une adresse e-mail." });
  }
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email, 
    subject: "Découvrez nos offres exclusives sur les produits informatiques !", 
    
    html: "<h1>Découvrez nos offres exclusives !</h1><p>N'hésitez pas à voir nos produits informatiques, tels que des PC et du matériel de gaming.</p><br><p><strong>Gigashop.com</strong></p>", 
};

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return res.status(500).json({ message: "Erreur lors de l'envoi de l'e-mail." });
    } else {
      return res.status(200).json({ message: "E-mail envoyé avec succès !" });
    }
  });
});

module.exports = router;