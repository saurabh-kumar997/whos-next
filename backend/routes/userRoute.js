const express = require("express");
const { secureRoute } = require("../controller/userController");

const secRoute = express.Router();

secRoute.get("/secure-route", secureRoute);

module.exports = secRoute;
