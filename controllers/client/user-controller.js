const md5 = require("md5");

const User = require("../../models/user-model");
const ForgotPassword = require("../../models/forgotPassword-model");

const generateHelper = require("../../helpers/generate");
const sendEmailHelper = require("../../helpers/sendEmail");

// [GET] /user/register
module.exports.register = async (req, res) => {
  res.render("client/pages/user/register", {
    pageTitle: "Register an Account",
  });
};

// [POST] /user/register
module.exports.registerPost = async (req, res) => {
  const existUser = await User.findOne({
    email: req.body.email,
    deleted: false
  });

  if (existUser) {
    req.flash("error", "Email already exists!");
    res.redirect("back");
    return;
  }

  const userData = {
    fullName: req.body.fullName,
    email: req.body.email,
    password: md5(req.body.password),
    tokenUser: generateHelper.generateRandomString(30)
  };

  const user = new User(userData);
  await user.save();

  res.cookie("tokenUser", user.tokenUser);

  req.flash("success", "Account registration successful!");
  res.redirect("/");
};

// [GET] /user/login
module.exports.login = async (req, res) => {
  res.render("client/pages/user/login", {
    pageTitle: "Login to Account",
  });
};

// [POST] /user/login
module.exports.loginPost = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    deleted: false
  });

  if (!user) {
    req.flash("error", "Email does not exist!");
    res.redirect("back");
    return;
  }

  if (md5(req.body.password) != user.password) {
    req.flash("error", "Incorrect password!");
    res.redirect("back");
    return;
  }

  if (user.status != "active") {
    req.flash("error", "Account is locked!");
    res.redirect("back");
    return;
  }

  res.cookie("tokenUser", user.tokenUser);

  await User.updateOne({
    email: req.body.email,
    deleted: false
  }, {
    statusOnline: "online"
  });

  _io.once("connection", (socket) => {
    // Broadcast to friends the online status of User A
    socket.broadcast.emit("SERVER_RETURN_USER_ONLINE", {
      status: "online",
      userIdA: user.id
    });
  });

  req.flash("success", "Login successful!");
  res.redirect("/");
};

// [GET] /user/logout
module.exports.logout = async (req, res) => {
  try {
    await User.updateOne({
      _id: res.locals.user.id
    }, {
      statusOnline: "offline"
    });
  } catch (e) {
    console.log(e);
  }

  _io.once("connection", (socket) => {
    // Broadcast to friends the offline status of User A
    socket.broadcast.emit("SERVER_RETURN_USER_ONLINE", {
      status: "offline",
      userIdA: res.locals.user.id
    });
  });

  res.clearCookie("tokenUser");
  res.redirect("/user/login");
};

// [GET] /user/password/forgot
module.exports.forgotPassword = async (req, res) => {
  res.render("client/pages/user/forgot-password", {
    pageTitle: "Recover Password",
  });
};

// [POST] /user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
  const email = req.body.email;

  const user = await User.findOne({
    email: email,
    deleted: false
  });

  if (!user) {
    req.flash("error", "Email does not exist in the system!");
    res.redirect("back");
    return;
  }

  const otp = generateHelper.generateRandomNumber(6);

  // Step 1: Save email and OTP to the database
  const forgotPasswordData = {
    email: email,
    otp: otp,
    expireAt: Date.now() + 3 * 60 * 1000
  };

  const forgotPassword = new ForgotPassword(forgotPasswordData);
  await forgotPassword.save();

  // Step 2: Send OTP via email to the user
  const subject = "OTP to recover password.";
  const htmlSendMail = `Your OTP verification code is <b style="color: green;">${otp}</b>. The OTP is valid for 3 minutes. Please do not share the OTP with anyone else.`;
  sendEmailHelper.sendEmail(email, subject, htmlSendMail);

  res.redirect(`/user/password/otp?email=${email}`);
};

// [GET] /user/password/otp
module.exports.otpPassword = async (req, res) => {
  const email = req.query.email;

  res.render("client/pages/user/otp-password", {
    pageTitle: "OTP Verification",
    email: email
  });
};

// [POST] /user/password/otp
module.exports.otpPasswordPost = async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;

  const result = await ForgotPassword.findOne({
    email: email,
    otp: otp
  });

  if (!result) {
    req.flash("error", "Invalid OTP!");
    res.redirect("back");
    return;
  }

  const user = await User.findOne({
    email: email
  });

  res.cookie("tokenUser", user.tokenUser);

  res.redirect("/user/password/reset");
};

// [GET] /user/password/reset
module.exports.resetPassword = async (req, res) => {
  res.render("client/pages/user/reset-password", {
    pageTitle: "Reset New Password"
  });
};

// [PATCH] /user/password/reset
module.exports.resetPasswordPatch = async (req, res) => {
  const password = req.body.password;
  const tokenUser = req.cookies.tokenUser;

  await User.updateOne({
    tokenUser: tokenUser,
    deleted: false
  }, {
    password: md5(password)
  });

  res.redirect("/");
};

// [GET] /user/profile
module.exports.profile = async (req, res) => {
  res.render("client/pages/user/profile", {
    pageTitle: "Personal Information"
  });
};
