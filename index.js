const debug = require("debug")("app:startup");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const home = require("./routes/home");
const genres = require("./routes/genres");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

if (app.get("env") === "development") {
  app.use(morgan("dev"));
  // console.log("Morgan enabled");
  debug("Morgan enabled...");
}

app.use("/api/genres", genres);
app.use("/", home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
