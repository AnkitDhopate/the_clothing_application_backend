const Category = require("../Models/category");
const slugify = require("slugify");
const shortId = require("shortid");

const sortCategories = (categories, parentId = null) => {
  const categoriesList = [];
  let tempCategory;

  if (parentId == null) {
    tempCategory = categories.filter(
      (single_category) => single_category.parentId == undefined
    );
  } else {
    tempCategory = categories.filter(
      (single_category) => single_category.parentId == parentId
    );
  }

  for (let i of tempCategory) {
    categoriesList.push({
      _id: i._id,
      name: i.name,
      slug: i.slug,
      categoryImage: i.categoryImage,
      parentId: i.parentId,
      childrenCategory: sortCategories(categories, i._id),
    });
  }

  return categoriesList;
};

exports.createCategory = (req, res) => {
  const newCategory = {
    name: req.body.name,
    slug: `${slugify(req.body.name)}-${shortId.generate()}`,
    categoryImage: process.env.API + "/public/" + req.file.filename,
  };

  if (req.body.parentId) {
    newCategory.parentId = req.body.parentId;
  }

  const category = new Category(newCategory);

  category.save((error, createdCategory) => {
    if (error) res.status(400).json({ error });

    if (createdCategory) {
      res.status(201).json({ createdCategory });
    }
  });
};

exports.getCategories = (req, res) => {
  Category.find().exec((error, categories) => {
    if (error) return res.status(400).json({ error });

    if (categories) {
      const categoryList = sortCategories(categories);
      return res.status(200).json({ categoryList });
    }
  });
};

exports.getCategoriesmob = (req, res) => {
  Category.find().exec((error, categories) => {
    if (error) return res.status(400).json({ error });

    if (categories) {
      const categoryList = sortCategories(categories);
      return res.status(200).json(categoryList);
    }
  });
};

exports.deleteCategories = async (req, res) => {
  const { ids } = req.body.payload;
  const deletedCategories = [];
  for (let i = 0; i < ids.length; i++) {
    const deleteCategory = await Category.findOneAndDelete({
      _id: ids[i],
    });
    deletedCategories.push(deleteCategory);
  }

  if (deletedCategories.length == ids.length) {
    res.status(201).json({ message: "Categories Removed" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};
