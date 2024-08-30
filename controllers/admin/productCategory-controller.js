const systemConfig = require("../../config/system");

const ProductCategory = require("../../models/productCategory-model");


// [GET] admin/product-category/
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  const category = await ProductCategory.find(find);
  res.render("./admin/pages/product-category/index", {
    pageTitle: "Product Category",
    category: category,
  });
};

// [GET] admin/product-category/create
module.exports.create = async (req, res) => {
  let find = {
    parent_id : "",
    deleted: false,
  };

  const category = await ProductCategory.find(find);
  res.render("./admin/pages/product-category/create", {
    pageTitle: "Create Category",
    category: category
  });
};

// [POST] admin/product-category/create
module.exports.createPost = async (req, res) => {
  const record = new ProductCategory(req.body);
  await record.save();
  res.redirect(`${systemConfig.prefixAdmin}/product-category`);
};
