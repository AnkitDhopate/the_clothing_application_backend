const express = require("express");
const router = express.Router();
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const {
  getCategories,
  createCategory,
  deleteCategories,
  getCategoriesmob,
} = require("../Controllers/category");
const {
  upload,
  requireSignIn,
  adminMiddleware,
} = require("../CommonMiddlewares/middleware");

router.get("/category/getcategory", getCategories);
router.get("/category/getcategorymob", getCategoriesmob);
router.post(
  "/category/create",
  requireSignIn,
  adminMiddleware,
  upload.single("categoryImage"),
  createCategory
);
router.post(
  `/category/delete`,
  requireSignIn,
  adminMiddleware,
  deleteCategories
);

module.exports = router;
