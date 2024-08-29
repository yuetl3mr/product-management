const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./public/uploads/" });

const controller = require("../../controllers/admin/products-controller");
const validate = require("../../validates/admin/product-validate");
const { route } = require("./dashboard-route");

router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus);

router.delete("/delete/:id", controller.delete);

router.get("/create", controller.create);

router.post("/create", upload.array("thumbnail", 4), validate.createPost, controller.createPost);

router.get("/edit/:id", controller.edit);

router.patch("/edit/:id", upload.array("thumbnail", 4), validate.createPost, controller.editPatch);

module.exports = router;
