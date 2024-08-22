require('dotenv').config();
const express = require("express");
const route = require("./routes/client/index-route");
const routeAdmin = require("./routes/admin/index-route");


const database = require("./config/database");

const port = process.env.PORT;
const app = express();

database.connect();

// Pug
app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

// Routes
route(app);
routeAdmin(app);

app.listen(port, () => {
    console.log(`App listen on port ${port}`);
});