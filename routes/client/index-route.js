const productsRouter = require("./products-route");
const homeRouter = require("./home-route");
const searchRouter = require("./search-route");
const cartRouter = require("./cart-route");
const checkoutRouter= require("./checkout-route");
const userRouter= require("./user-route");
const chatRouter= require("./chat-route");
const usersRouter= require("./users-route");
const roomsChatRouter= require("./roomsChat-route");

const categoryMiddleware = require("../../middlewares/client/category.middleware");
const cartMiddleware = require("../../middlewares/client/cart.middleware");
const userMiddleware = require("../../middlewares/client/user.middleware");
const settingMiddleware = require("../../middlewares/client/setting.middleware");

module.exports = (app) => {
  app.use("/", homeRouter);

  app.use("/", productsRouter);

  app.use("/", searchRouter);

  app.use("/", cartRouter);

  app.use("/checkout", checkoutRouter);

  app.use("/user", userRouter);

  app.use("/chat", userMiddleware.requireAuth, chatRouter);

  app.use("/users", userMiddleware.requireAuth, usersRouter);

  app.use("/rooms-chat", userMiddleware.requireAuth, roomsChatRouter);
};
