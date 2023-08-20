const express = require("express");
const {
  secureRoute,
  updateProfileData,
  deleteAccount,
} = require("../controller/userController");

const secRoute = express.Router();

secRoute.get("/secure-route", secureRoute);
secRoute.patch("/update-profile", updateProfileData);
secRoute.delete("/delete-account", deleteAccount);

module.exports = secRoute;
