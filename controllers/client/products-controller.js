const Product = require("../../models/product-model");
const Category = require("../../models/productCategory-model");
const productHelper = require("../../helpers/product");


module.exports.index = async (req, res) => {
  let find = {
    status: "active",
    deleted: false,
  };

  // Pagination
  let paginationObject = {
    currentPage: 1,
    limitItems: 8,
    skip: 0,
  };

  if (req.query.page) {
    paginationObject.currentPage = parseInt(req.query.page);
    paginationObject.skip =
      (paginationObject.currentPage - 1) * paginationObject.limitItems;
  }

  let countProduct = await Product.countDocuments(find);

  paginationObject.totalPage = Math.ceil(
    countProduct / paginationObject.limitItems
  );

  var Products = await Product.find(find)
    .limit(paginationObject.limitItems)
    .skip(paginationObject.skip);

  Products = productHelper.priceNewProducts(Products);

  res.render("./client/pages/products/index", {
    pageTitle: "Products",
    products: Products,
    pagination: paginationObject,
  });
};

module.exports.index = async (req, res) => {
  let find = {
    status: "active",
    deleted: false,
  };

  // Pagination
  let paginationObject = {
    currentPage: 1,
    limitItems: 8,
    skip: 0,
  };

  if (req.query.page) {
    paginationObject.currentPage = parseInt(req.query.page);
    paginationObject.skip =
      (paginationObject.currentPage - 1) * paginationObject.limitItems;
  }

  let countProduct = await Product.countDocuments(find);

  paginationObject.totalPage = Math.ceil(
    countProduct / paginationObject.limitItems
  );

  var Products = await Product.find(find)
    .limit(paginationObject.limitItems)
    .skip(paginationObject.skip);

  Products = productHelper.priceNewProducts(Products);

  res.render("./client/pages/products/index", {
    pageTitle: "Products",
    products: Products,
    pagination: paginationObject,
  });
};


module.exports.single = async (req, res) => {
  let find = {
    status: "active",
    deleted: false,
  };
  var Products = await Product.find(find).limit(4);

  Products = productHelper.priceNewProducts(Products);

  res.render("./client/pages/products/sproduct", {
    pageTitle: "Edit",
    products: Products,
  });
}