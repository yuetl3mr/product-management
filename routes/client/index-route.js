const productsRouter = require("./products-route");
const homeRouter = require("./home-route");
const searchRouter = require("./search-route");

module.exports = (app) => {
    app.use("/", homeRouter);
    
    app.use("/", productsRouter);

    app.use("/", searchRouter)
}

