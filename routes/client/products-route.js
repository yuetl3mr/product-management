const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/products-controller");

router.get('/products', controller.index);
router.get('/products/:id', controller.single);

module.exports = router;



