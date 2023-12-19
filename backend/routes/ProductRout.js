const express = require("express");
const {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
} = require("../controllers/ProductCtrl");
const { isAdmin, auth } = require("../middlewares/auth");
const router = express.Router();

router.post("/", auth, isAdmin, createProduct);

router.get("/:id", getaProduct);
router.put("/wishlist", auth, addToWishlist);
router.put("/rating",auth, rating);

router.put("/:id", auth, isAdmin, updateProduct);
router.delete("/:id",auth, isAdmin, deleteProduct);

router.get("/", getAllProduct);

module.exports = router;
