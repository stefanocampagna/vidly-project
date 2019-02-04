const express = require("express");
const debug = require("debug")("app:startup");
const config = require("config");

const helmet = require("helmet");
const morgan = require("morgan");

const home = require("./routes/home");
const genres = require("./routes/genres");

const logger = require('./middleware/logger');

const app = express();

// View engine
app.set("view engine", "pug");
app.set("views", "./views");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use(logger);

// Configuration
debug(`Application name: ${config.get('name')}`);
debug(`Mail Host: ${config.get('mail.host')}`);
debug(`Mail Password: ${config.get('mail.password')}`);

if (app.get("env") === "development") {
  app.use(morgan("dev"));
  // console.log("Morgan enabled");
  debug("Morgan enabled...");
}
 
// Routes
app.use("/", home);
app.use("/api/genres", genres);

const port = process.env.PORT || 3000;
app.listen(port, () => debug(`Listening on port ${port}...`));
