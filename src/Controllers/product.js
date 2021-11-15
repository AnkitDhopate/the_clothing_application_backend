const Category = require("../Models/category");
const Product = require("../Models/product");
const slugify = require("slugify");
const shortid = require("shortid");

exports.getProductsBySlug = (req, res) => {
  const { slug } = req.params;

  Category.findOne({ slug: slug })
    .select("_id")
    .exec((error, category) => {
      if (error) {
        return res.status(400).json({ error });
      }

      if (category) {
        Product.find({ parentId: category._id }).exec((error, products) => {
          if (error) {
            return res.status(400).json({ error });
          }

          if (products.length > 0) {
            res.status(200).json(products);
          }
        });
      }
    });
};

exports.createProduct = (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const { name, parentId, price, description } = req.body;
  const productImage = process.env.API + "/public/" + req.file.filename;
  const newProduct = new Product({
    name,
    slug: `${slugify(name)}-${shortid.generate()}`,
    parentId,
    price,
    description,
    productImage,
  });

  newProduct.save((error, createdProduct) => {
    if (error) return res.status(400).json({ error });

    if (createdProduct) {
      return res.status(201).json({ createdProduct });
    }
  });
};

exports.getAllProducts = (req, res) => {
  Product.find().exec((error, products) => {
    if (error) return res.status(400).json({ error });

    if (products) {
      return res.status(201).json({ productsList: products });
    }
  });
};

exports.getAllProductsMob = (req, res) => {
  Product.find().exec((error, products) => {
    if (error) return res.status(400).json({ error });

    if (products) {
      return res.status(201).json(products);
    }
  });
};

exports.deleteProducts = async (req, res) => {
  const { ids } = req.body.payload;
  const deletedProducts = [];
  for (let i = 0; i < ids.length; i++) {
    const deleteProduct = await Product.findOneAndDelete({
      _id: ids[i],
    });
    deletedProducts.push(deleteProduct);
  }

  if (deletedProducts.length == ids.length) {
    res.status(201).json({ message: "Products Removed" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};
