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
        response.message = "Something went wrongssss";
        return next(response);
      }

      if (!user) {
        response.status = 400;
        response.message = "Account not found,please signup before signin";
        return next(response);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) {
          response.error = error;
          response.status = 500;
          response.message = "Something went wrong";
          return next(response);
        }

        const body = { id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, "TOP_SECRET", {
          expiresIn: "1h",
        });

        response.data = { token };
        response.status = 200;
        response.message = "Signin Success";
        return res.status(200).json(response);
      });
    } catch (error) {
      response.error = error;
      response.status = 500;
      response.message = "Something went wrong";
      return next(response);
    }
  })(req, res, next);
};

const secureRoute = async (req, res, next) => {
  const resp = new ResponseModel();
  try {
    const user = req.user;
    res.json({
      message: "You made it to the secure route",
      user: req.user,
      token: req.get("x-token"),
    });
  } catch (err) {
    console.error(err);
  }
};

const getGroups = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId)
    .populate({
      path: "groups",
      populate: {
        path: "members",
        model: "User",
        select: "_id email name",
      },
    })
    .select("_id email name groups");

  console.log("USER", user);
  res.json({
    message: "You made it to the secure route",
    user,
  });
};

module.exports = {
  signInRoute,
  signUpRoute,
  secureRoute,
  getGroups,
};
