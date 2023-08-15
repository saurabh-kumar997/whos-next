const ResponseModel = require("../model/responseModel");

const secureRoute = async (req, res, next) => {
  const resp = new ResponseModel();
  try {
    res.json({
      message: "You made it to the secure route",
      user: req.user,
      token: req.get("x-token"),
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  secureRoute,
};
