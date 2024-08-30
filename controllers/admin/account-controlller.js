const systemConfig = require("../../config/system");
const md5 = require("md5");

const Account = require("../../models/account-model");

// [GET] admin/account
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Account.find(find);
  res.render("admin/pages/account/index", {
    pageTitle: "Accounts",
    records: records,
  });
};

// [GET] admin/account/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/account/create", {
    pageTitle: "Create Account",
  });
};

// [POST] admin/account/create
module.exports.createPost = async (req, res) => {
  const emailExist = await Account.find({
    email: req.body.email,
  });
  if (emailExist) {
    req.flash("info2", "Email Exist!");
    res.redirect("Back");
  } else {
    req.body.password = md5(req.body.password);
    const record = new Account(req.body);
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/account`);
  }
};

// [DELETE] admin/products/delete/:id
module.exports.delete = async (req, res) => {
  const id = req.params.id;
  await Product.updateOne({ _id: id }, { deleted: true });
  req.flash("info", "Delete Success!");
  res.redirect(`${systemConfig.prefixAdmin}/account`);
};

// [GET] admin/products/delete/:id
module.exports.edit = async (req, res) => {
  res.render("admin/pages/account/edit", {
    pageTitle: "Create Account",
  });
};

// [PATCH] admin/products/delete/:id
module.exports.editPatch = async (req, res) => {
  try {
    await Account.updateOne(
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
  res.redirect(`${systemConfig.prefixAdmin}/account`);
};
