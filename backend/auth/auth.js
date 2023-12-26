const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const UserModel = require("../model/UserModels");
const ResponseModel = require("../model/responseModel");

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
      session: false,
    },
    async (req, email, password, done) => {
      const response = new ResponseModel();
      try {
        const body = req.body;
        const isUser = await UserModel.findOne({ email });

        if (isUser) {
          response.message = "User already exist";
          response.status = 400;
          return done(null, response);
        }
        const user = await UserModel.create({
          name: body.name,
          email,
          password,
        });
        response.data = {
          name: user.name,
          email: user.email,
          userId: user._id,
        };
        return done(null, response);
      } catch (error) {
        response.status = 500;
        response.message = "Something went wrong";
        response.error = error;
        return done(response);
      }
    }
  )
);

passport.use(
  "signin",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const resp = new ResponseModel();
      try {
        const user = await UserModel.findOne({ email });

        if (!user) {
          resp.message = "User not found! No user found with this email";
          resp.status = 404;
          return done(null, false, resp);
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          resp.status = 401;
          resp.message = "Invalid email or password";
          return done(null, false, resp);
        }
        console.log("strategy: ", validate);
        resp.status = 200;
        resp.message = "Logged in Successfully";
        resp.data = {
          email: user.email,
          _id: user._id,
          name: user.name,
        };
        return done(null, resp.data, resp);
      } catch (error) {
        resp.status = 500;
        resp.error = error;
        return done(resp);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: "TOP_SECRET",
      jwtFromRequest: ExtractJWT.fromHeader("x-token"),
    },
    async (token, done) => {
      console.log("TOKEN", token);
      try {
        return done(null, token.user, null);
      } catch (error) {
        console.log("ERROR", error);
        done(error);
      }
    }
  )
);
