const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/account-controlller");

const validate = require("../../validates/admin/account-validate");


router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", validate.createPost, controller.createPost);

router.delete("/delete/:id", controller.delete);

router.get("/edit/:id", controller.edit);

router.patch("/edit/:id", controller.editPatch);

module.exports = router;
