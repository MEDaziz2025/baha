// controllers/produitController.js
const Produit = require("../models/produitSchema");

// ✅ Ajouter un nouveau produit
exports.addProduit = async (req, res) => {
  try {
    const { name,  price, category } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Le nom et le prix sont obligatoires." });
    }

    const newProduit = new Produit({ name,  price, category});
    const savedProduit = await newProduit.save();

    res.status(201).json(savedProduit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Récupérer tous les produits
exports.getAllProduits = async (req, res) => {
  try {
    const produits = await Produit.find();
    res.status(200).json(produits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Récupérer un produit par ID
exports.getProduitById = async (req, res) => {
  try {
    const { id } = req.params;
    const produit = await Produit.findById(id);

    if (!produit) return res.status(404).json({ message: "Produit introuvable" });
    res.status(200).json(produit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Mettre à jour un produit
exports.updateProduit = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduit = await Produit.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedProduit) return res.status(404).json({ message: "Produit non trouvé" });
    res.status(200).json(updatedProduit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Supprimer un produit
exports.deleteProduit = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Produit.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: "Produit non trouvé" });
    res.status(200).json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
