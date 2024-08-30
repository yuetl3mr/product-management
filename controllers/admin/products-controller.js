const systemConfig = require("../../config/system");

const Product = require("../../models/product-model");
const Category = require("../../models/productCategory-model");

const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  let filterStatus = filterStatusHelper(req.query);
  let searchObject = searchHelper(req.query);

  let find = {
    deleted: false,
  };

  if (req.query.status) find.status = req.query.status;

  // Search
  if (searchObject.regex) find.title = searchObject.regex;

  // Pagination
  let paginationObject = {
    currentPage: 1,
    limitItems: 4,
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

  const Products = await Product.find(find)
    .limit(paginationObject.limitItems)
    .skip(paginationObject.skip);

  res.render("admin/pages/products/index", {
    pageTitle: "Products",
    products: Products,
    filterStatus: filterStatus,
    keyword: searchObject.keyword,
    pagination: paginationObject,
  });
};

// [PATCH] admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  await Product.updateOne({ _id: id }, { status: status });

  req.flash("info", "Update Success!");

  res.redirect("back");
};

// [DELETE] admin/products/delete/:id
module.exports.delete = async (req, res) => {
  const id = req.params.id;
  await Product.updateOne({ _id: id }, { deleted: true });
  req.flash("info", "Delete Success!");
  res.redirect(`${systemConfig.prefixAdmin}/products`);
};

// [GET] admin/products/create
module.exports.create = async (req, res) => {
  const productCategory = await Category.find({
    deleted: false,
    parent_id: { $ne: "" }
  });

  res.render("admin/pages/products/create", {
    pageTitle: "Create",
    category: productCategory
  });
};

// [POST] admin/products/create
module.exports.createPost = async (req, res) => {
  req.body.price = parseFloat(req.body.price);
  req.body.discountPercentage = parseFloat(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  if (req.body.position == "") {
    const countProduct = await Product.countDocuments();
    req.body.position = countProduct + 1;
  } else req.body.position = parseInt(req.body.position);
  const newProduct = new Product(req.body);
  await newProduct.save(); // Save product

  res.redirect(`/admin/products`);
};

// [GET] admin/products/edit/:id
module.exports.edit = async (req, res) => {
  const productCategory = await Category.find({
    deleted: false,
    parent_id: { $ne: "" }
  });
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };

    const product = await Product.findOne(find);

    res.render("admin/pages/products/edit", {
      pageTitle: "Edit products",
      product: product,
      category: productCategory
    });
  } catch (error) {
    req.flash("info2", "Not Found");
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};

// [PATH] admin/products/edit/:id

module.exports.editPatch = async (req, res) => {
  req.body.price = parseFloat(req.body.price);
  req.body.discountPercentage = parseFloat(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);

  if (req.file == "") {
    req.body.thumbnail = ``;
  }

  try {
    await Product.updateOne(
      {
        _id: req.params.id,
      },
      req.body
    );
  } catch (error) {
    req.flash("info2", "Edit Fail! Please check input!");
    res.redirect("back");
  }

  req.flash("info", "Edit Success");
  res.redirect(`${systemConfig.prefixAdmin}/products`);
};
