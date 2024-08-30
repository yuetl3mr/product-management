module.exports.loginPost = (req, res, next) => {
    if(!req.body.email || !req.body.password){
      req.flash("info2", "Please input info!");
      res.redirect("back");
      return;
    }
    next();
}