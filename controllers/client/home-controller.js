const Product = require("../../models/product-model");

module.exports.index = async (req, res) => {
    const Products = await Product.find({
        status : "active", 
        deleted : false
    }).limit(8);

    Products.forEach(item => {
        item.newPrice = (item.price * (100 -item.discountPercentage) / 100).toFixed(2);
    });

    res.render("./client/pages/home/index", {
        pageTitle: "Home",
        products : Products   
    });

}
