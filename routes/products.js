const express = require("express");
const router = express.Router();
const pool = require("../config/db");

router.get("/all", async (req, res) => {
    try {
        const { rows: allProducts } = await pool.query("SELECT * FROM products");
        res.status(200).json(allProducts);
    } 
    catch (error) {
        res.status(500).json({ message: error.message });    
    }
});

module.exports = router;
