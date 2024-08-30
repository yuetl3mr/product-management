const systemConfig = require("../../config/system");
const Account = require("../../models/account-model");

module.exports.requireAuth = async (req, res, next) => {
  if(!req.cookies.token) {
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    return;
  }

  const account = await Account.findOne({
    token: req.cookies.token,
    deleted: false
  }).select("fullName email phone avatar role_id");

  if(!account) {
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    return;
  }
  res.locals.account = account;
  next();
}