const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      discountPercentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
      stock: {
        type: Number,
        required: true,
        min: 0,
      },
      thumbnail: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
        required: true,
      },
      position: {
        type: Number,
        required: true,
      },
      deleted: {
        type: Boolean,
        default: false,
        required: true,
      }
});

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;