const UserToken = require("../model/UserTokenModel");
const ResponseModel = require("../model/responseModel");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const signUpRoute = (req, res, next) => {
  try {
    const response = req.user;
    return res.status(response?.status).json(response);
  } catch (error) {
    return next(error);
  }
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
        return res.status(info?.status).json(info);
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
          expiresIn: "10m",
        });

        const refreshToken = jwt.sign({ user: body }, "REFRESH_TOP_SECRET", {
          expiresIn: "1h",
        });

        const userToken = await UserToken.findOne({ userId: user._id });
        if (userToken) await userToken.deleteOne();

        await new UserToken({ userId: user._id, token: refreshToken }).save();
        response.data = { user, token, refreshToken };
        response.status = 200;
        response.message = "Signin Success";
        return res.status(response.status).json(response);
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
