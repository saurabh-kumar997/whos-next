const express = require("express");
const passport = require("passport");
const { signInRoute, signUpRoute } = require("../controller/userController");

const userRoute = express.Router();

userRoute.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  signUpRoute
);
userRoute.post("/signin", signInRoute);

module.exports = userRoute;
