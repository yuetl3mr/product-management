const systemConfig = require("../../config/system")

const authMiddleware = require("../../middlewares/admin/auth-middleware.js");

const dashboardRouter = require("./dashboard-route");
const productsRouter = require("./products-route");
const productsCategoryRouter = require("./productCategory-route");
const accountRouter = require("./account-route");
const authRouter = require("./auth-route");

module.exports = (app) => {
    app.use(systemConfig.prefixAdmin + "/dashboard", authMiddleware.requireAuth, dashboardRouter);
    
    app.use(systemConfig.prefixAdmin + "/products", authMiddleware.requireAuth, productsRouter);

    app.use(systemConfig.prefixAdmin + "/product-category",authMiddleware.requireAuth, productsCategoryRouter);

    app.use(systemConfig.prefixAdmin + "/account",authMiddleware.requireAuth, accountRouter);

    app.use(systemConfig.prefixAdmin + "/auth", authRouter);
}