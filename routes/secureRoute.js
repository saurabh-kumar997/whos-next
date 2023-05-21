const express = require("express");
const { secureRoute } = require("../controller/userController");

const secRoute = express.Router();

secRoute.get("/", secureRoute);

module.exports = secRoute;
