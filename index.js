const express = require("express");
const path = require("path");
const morgan = require("morgan");
const app = express();

// hbs
const exphbs = require("express-handlebars");

// puerto
app.set("port", process.env.PORT || 3000);

// configuracion hbs
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs"
  })
);
app.set("view engine", ".hbs");

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use("/", require("./routes/index.js"));

// files static
// app.use("public/", express.static(path.join(__dirname, "public/")));
app.use(express.static(path.join(__dirname, "public/")));

// starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
