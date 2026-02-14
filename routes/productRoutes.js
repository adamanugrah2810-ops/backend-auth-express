const express = require("express");
const router = express.Router();
const db = require("../config/db");
const auth = require("../middleware/authMiddleware");

// GET ALL PRODUCTS
router.get("/", auth, (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// ADD PRODUCT
router.post("/", auth, (req, res) => {
  const { name, price, stock } = req.body;

  if (!name || !price || !stock) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }

  db.query(
    "INSERT INTO products (name, price, stock) VALUES (?, ?, ?)",
    [name, price, stock],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Produk berhasil ditambahkan" });
    },
  );
});

// UPDATE PRODUCT
router.put("/:id", auth, (req, res) => {
  const { name, price, stock } = req.body;

  db.query(
    "UPDATE products SET name=?, price=?, stock=? WHERE id=?",
    [name, price, stock, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Produk berhasil diupdate" });
    },
  );
});

// DELETE PRODUCT
router.delete("/:id", auth, (req, res) => {
  db.query("DELETE FROM products WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Produk dihapus" });
  });
});

module.exports = router;
