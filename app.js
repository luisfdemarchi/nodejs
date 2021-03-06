const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
//const expressHBs = require("express-handlebars");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error")

const app = express();

// app.engine(
//   "hbs",
//   expressHBs({
//     layoutsDir: "views/layouts",
//     defaultLayout: "main-layout",
//     extname: "hbs"
//   })
// );
//app.set("view engine", "pug");
//app.set("view engine", "hbs");
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", (req, res, next) => {
  console.log("This always runs!");
  next();
});

app.use("/admin", adminData.routes);
app.use(shopRoutes);
app.use("/", errorController.get404Page);

app.listen(3000);
