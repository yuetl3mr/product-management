const Product = require("../../models/product-model");

module.exports.index = async (req, res) => {
  res.render("./client/pages/cart/index", {
    pageTitle: "Cart",
    products: Product
  });
}