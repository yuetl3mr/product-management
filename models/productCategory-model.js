const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const productCategorySchema = new mongoose.Schema(
    {
        title: String,
        parent_id: {
            type: String,
            default: ""
        },
        description: String,
        slug: {
            type: String,
            slug: "title",
            unique: true
        },
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date
    }, {
    timestamps: true
}
);

const ProductCategory = mongoose.model("product-category", productCategorySchema, "products-category");

module.exports = ProductCategory;
