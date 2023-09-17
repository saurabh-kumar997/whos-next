const User = require("../model/UserModels");
const ResponseModel = require("../model/responseModel");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const signUpRoute = (req, res) => {
  const response = req.user;
  return res.status(response.status).json(req.user);
};

const signInRoute = async (req, res, next) => {
  passport.authenticate("signin", async (err, user, info) => {
    const response = new ResponseModel();
    console.log("REQUEST: ", user, info);
    try {
      if (err) {
        const error = new Error("An error occurred.");
        response.error = error;
        response.status = 500;
        response.message = "Something went wrong!";
        return next(response);
      }

      if (!user) {
        return res.status(response.status).json(info);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) {
          response.error = error;
          response.status = 500;
          response.message = "Something went wrong!";
          return res.status(response.status).json(response);
        }

        const body = { id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, "TOP_SECRET", {
          expiresIn: "1h",
        });

        response.data = { user, token };
        response.status = 200;
        response.message = "Signin Success";
        return res.status(200).json(response);
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
};

module.exports = {
  signInRoute,
  signUpRoute,
};
