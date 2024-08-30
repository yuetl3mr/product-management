const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/products-controller");

router.get('/products', controller.index);

// router.get('/products/:slugCategory', controller.index);

router.get('/products/detail/:id', controller.single);

module.exports = router;



