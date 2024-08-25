const systemConfig = require("../../config/system")

const dashboardRouter = require("./dashboard-route");
const productsRouter = require("./products-route");

module.exports = (app) => {
    app.use(systemConfig.prefixAdmin + "/dashboard", dashboardRouter);
    
    app.use(systemConfig.prefixAdmin + "/products", productsRouter);
}