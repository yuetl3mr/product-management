const Product = require("../../models/product-model");

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

  const Products = await Product.find(find)
    .limit(paginationObject.limitItems)
    .skip(paginationObject.skip);

  Products.forEach((item) => {
    item.newPrice = (
      (item.price * (100 - item.discountPercentage)) /
      100
    ).toFixed(2);
  });

  res.render("./client/pages/products/index", {
    products: Products,
    pagination: paginationObject,
  });
};
