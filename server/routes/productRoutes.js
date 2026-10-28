
const express = require("express");
const router = express.Router();

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");
const { adminMiddleware } = require("../middleware/adminMiddleware");
// Public: view all products
router.get("/", getProducts);



router.post("/", protect, adminMiddleware, createProduct);
router.put("/:id", protect, adminMiddleware, updateProduct);
router.delete("/:id", protect, adminMiddleware, deleteProduct);

module.exports = router