const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Get all products
router.get("/all", async (req, res) => {
    try {
        const { rows: allProducts } = await pool.query("SELECT * FROM shop_products");
        res.status(200).json(allProducts);
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get distinct categories (ensure this route comes before the /:id route)
router.get("/categories", async (req, res) => {
    try {
        const selected_category = await pool.query("SELECT DISTINCT category FROM shop_products");
        res.status(200).json(selected_category.rows);
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single product by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const { rows: product } = await pool.query(
            "SELECT * FROM shop_products WHERE id = $1",
            [id]
        );

        if (product.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product[0]);
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
