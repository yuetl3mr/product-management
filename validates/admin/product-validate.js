module.exports.createPost = (req, res, next) => {
    if(!req.body.title){
      req.flash("info2", "Please input title");
      res.redirect("back");
      return;
    }
    next();
}