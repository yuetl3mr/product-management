require("dotenv").config();
const flash = require("express-flash");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
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
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));

//Tiny MCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

// Flash
app.use(cookieParser("ABCDF"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

// App Locals Variables
app.locals.prefixAdmin = sysConfig.prefixAdmin;

app.use(express.static(`${__dirname}/public`));

// Routes
route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`App listen on port ${port}`);
});
