const express = require("express");
const {
  refreshTokenRoute,
  deleterefreshTokenRoute,
} = require("../controller/refreshTokenController");

const refreshRoute = express.Router();

refreshRoute.post("/refresh-token", refreshTokenRoute);
refreshRoute.delete("/refresh-token", deleterefreshTokenRoute);

module.exports = refreshRoute;
