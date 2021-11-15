const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  categoryImage: {
    type: String,
    required: true,
  },
  parentId: {
    type: String,
  },
});

module.exports = mongoose.model("Category", categorySchema);
