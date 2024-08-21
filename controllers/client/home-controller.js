const Product = require("../../models/product-model");

module.exports.index = async (req, res) => {
    const Products = await Product.find({
        status : "active", 
        deleted : false
    }).limit(8);
    res.render("./client/pages/home/index", {
        pageTitle : "Main Page", 
        products : Products   
    });
}
