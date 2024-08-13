const express = require("express");
const router = express.Router();

router.get('/products', (req, res) => {
    res.render("./client/pages/products/index")
});

router.get('/create', (req, res) => {
    res.render("./client/pages/products/index")
});

module.exports = router;



