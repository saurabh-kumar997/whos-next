const passport = require("passport");
const ResponseModel = require("../model/responseModel");

function errorHandlerMiddleware(err, req, res, next) {
  const resp = new ResponseModel();
  resp.status = err.status || 500;
  resp.error = err?.message || "Something went wrong";
  return res.status(resp.status).json(resp);
}

function authenticateMiddleware(req, res, next) {
  return passport.authenticate("jwt", { session: false }, (err, user) => {
    console.log("USERSSS", user);
    if (err) {
      return next(err);
    }

    if (!user) {
      let resp = new ResponseModel();
      resp.status = 401;
      resp.message = "Unauthorized";
      return res.status(400).json(resp);
    }
    req.user = user;
    return next();
  })(req, res, next);
}

module.exports = {
  errorHandlerMiddleware,
  authenticateMiddleware,
};
