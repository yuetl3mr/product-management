const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  discountPercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  thumbnail: {
    type: [String],
    required: true
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
    required: true
  },
  position: {
    type: Number,
    required: true
  },
  deleted: {
    type: Boolean,
    default: false,
    required: true
  },
  category: {
    type: String,
    default:"Manga",
    required: true,
    unique: true
  },
  slug: {
    type: String,
    slug: "title"
  }
}, 
{
  timestamps: true
});

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
