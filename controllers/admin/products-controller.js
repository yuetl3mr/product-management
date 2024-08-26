const Product = require("../../models/product-model");
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
    await Product.updateOne({_id : id}, {deleted: true});
    req.flash("info", "Delete Success!");
    res.redirect("back");
}


// [POST] admin/products/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/products/create", {});
}