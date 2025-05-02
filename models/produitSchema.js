// models/produitSchema.js
const mongoose = require("mongoose");

const produitSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
   
    price: { type: Number, required: true },
    category: { type: String },
    
  },
  { timestamps: true }
);

const Produit = mongoose.model("Produit", produitSchema);
module.exports = Produit;
