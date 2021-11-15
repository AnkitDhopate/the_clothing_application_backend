const express = require("express");
const {
  requireSignIn,
  userMiddleware,
} = require("../CommonMiddlewares/middleware");
const {
  addItemToCart,
  getCartItems,
  getCartItemsMob,
  removeCartItem,
} = require("../Controllers/cart");
const router = express.Router();

router.post(
  `/user/cart/addtocart`,
  requireSignIn,
  userMiddleware,
  addItemToCart
);

router.get(
  `/user/cart/getcartitems`,
  requireSignIn,
  userMiddleware,
  getCartItems
);

router.post(
  `/user/cart/removeitem`,
  requireSignIn,
  userMiddleware,
  removeCartItem
);

module.exports = router;
