require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const route = require("./routes/client/index-route");
const routeAdmin = require("./routes/admin/index-route");

const sysConfig = require("./config/system");

const database = require("./config/database");

const port = process.env.PORT;
const app = express();

app.use(methodOverride("_method"));

database.connect();

// Pug
app.set("views", "./views");
app.set("view engine", "pug");

// App Locals Variables
app.locals.prefixAdmin = sysConfig.prefixAdmin;

app.use(express.static("public"));

// Routes
route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`App listen on port ${port}`);
});
