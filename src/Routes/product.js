const express = require("express");
const {
  requireSignIn,
  adminMiddleware,
  upload,
} = require("../CommonMiddlewares/middleware");
const {
  getProductsBySlug,
  createProduct,
  getAllProducts,
  deleteProducts,
  getAllProductsMob,
} = require("../Controllers/product");
const router = express.Router();

router.get(`/product/getallproducts`, getAllProducts);
router.get(`/product/getallproductsmob`, getAllProductsMob);
router.get("/products/:slug", getProductsBySlug);
router.post(
  `/product/create`,
  requireSignIn,
  adminMiddleware,
  upload.single("productImage"),
  createProduct
);
router.post(`/product/delete`, requireSignIn, adminMiddleware, deleteProducts);

module.exports = router;
