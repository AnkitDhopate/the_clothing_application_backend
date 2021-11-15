const Cart = require("../Models/cart");

function runUpdate(condition, updateData) {
  return new Promise((resolve, reject) => {
    Cart.findOneAndUpdate(condition, updateData, { upsert: true })
      .then((result) => {
        return resolve();
      })
      .catch((error) => {
        return reject(error);
      });
  });
}

exports.addItemToCart = (req, res) => {
  Cart.findOne({ user: req.user._id }).exec((error, cart) => {
    if (error) return res.status(400).json({ error });
    if (cart) {
      let promiseArray = [];

      req.body.cartItems.forEach((cartItem) => {
        const product = cartItem.product;
        const item = cart.cartItems.find((c) => {
          return c.product._id == product._id;
        });

        let condition, update;

        if (item) {
          condition = { user: req.user._id, "cartItems.product": product };
          update = {
            $set: {
              "cartItems.$": cartItem,
            },
          };
        } else {
          condition = { user: req.user._id };
          update = {
            $push: {
              cartItems: cartItem,
            },
          };
        }
        promiseArray.push(runUpdate(condition, update));
      });
      Promise.all(promiseArray)
        .then((response) => {
          return res.status(201).json({ response });
        })
        .catch((error) => {
          return res.status(400).json({ error });
        });
    } else {
      const cart = new Cart({
        user: req.user._id,
        cartItems: req.body.cartItems,
      });

      cart.save((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          return res.status(201).json({ cart });
        }
      });
    }
  });
};

exports.getCartItems = (req, res) => {
  Cart.findOne({ user: req.user._id })
    .populate("cartItems.product", "_id name price productImage")
    .exec((error, cart) => {
      if (error) return res.status(400).json({ error: error });
      if (cart) {
        let cartItems = [];
        cart.cartItems.forEach((item, index) => {
          cartItems.push(item);
        });
        res.status(200).json({ cartItems });
      }
    });
};

exports.removeCartItem = async (req, res) => {
  const { _id } = req.body;
  const userId = req.user._id;
  try {
    const result = await Cart.find({ user: userId }).update(
      {},
      { $pull: { cartItems: { _id } } }
    );
    return res.status(201).json({ result });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
