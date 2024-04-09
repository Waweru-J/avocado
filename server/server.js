// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { notFoundHandler, errorHandler } = require("./middleware/index.js");
const routes = require("./routes/authRouter.js");

dotenv.config();
const app = express();

// middlewares
app.use(express.static("client"));
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/v1", routes);

app.use(errorHandler);
app.use(notFoundHandler);

module.exports = app;
