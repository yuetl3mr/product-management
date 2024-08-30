const Product = require("../../models/product-model");
const Category = require("../../models/productCategory-model");
const treeHelper = require("../../helpers/createTree");
const productHelper = require("../../helpers/product");
module.exports.index = async (req, res) => {
    const productCategory = await Category.find({
        deleted: false
    });

    const newProductCategory = treeHelper(productCategory);
    var Products = await Product.find({
        status : "active", 
        deleted : false
    }).limit(8);

    Products = productHelper.priceNewProducts(Products);

    res.render("./client/pages/home/index", {
        pageTitle: "Home",
        products : Products,
        layoutProductsCategory : newProductCategory
    });

}
