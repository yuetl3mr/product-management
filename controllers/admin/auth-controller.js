const Account = require("../../models/account-model");
const md5 = require("md5");
const systemConfig = require("../../config/system");

// [GET] /admin/auth/login
module.exports.login = async (req, res) => {
  res.render("admin/pages/auth/login", {
    pageTitle: "login"
  });
}

// [POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const account = await Account.findOne({
    email: email,
    deleted: false
  });

  if(!account) {
    req.flash("info2", "Email not found!");
    res.redirect("back");
    return;
  }

  if(md5(password) != account.password) {
    req.flash("info2", "Password not match!");
    res.redirect("back");
    return;
  }

  res.cookie("token", account.token);
  res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
}

// [GET] /admin/auth/logout
module.exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
}