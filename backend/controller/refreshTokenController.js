const UserToken = require("../model/UserTokenModel");
const User = require("../model/UserModels");
const ResponseModel = require("../model/responseModel");
const jwt = require("jsonwebtoken");

const refreshTokenRoute = async (req, res, next) => {
  const { refreshToken } = req.body;
  jwt.verify(refreshToken, "REFRESH_TOP_SECRET", async (err, tokenDetails) => {
    try {
      const response = new ResponseModel();
      console.log("REFRESH: ", tokenDetails);

      if (err || !tokenDetails?.user?.id) {
        response.status = 400;
        response.message = "Invalid Refresh Token";
        return res.status(response.status).json(response);
      }
      const user = tokenDetails.user;

      const userData = await User.findById(user.id).select("_id name email");

      if (!userData) {
        response.status = 400;
        response.message = "Invalid Refresh Token";
        return res.status(response.status).json(response);
      }

      const body = { id: userData._id, email: userData.email };
      const token = jwt.sign({ user: body }, "TOP_SECRET", {
        expiresIn: "10m",
      });

      response.data = { user: userData, token };
      return res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  });
};

const deleterefreshTokenRoute = async (req, res, next) => {
  const refToken = req.headers["x-refresh"];
  var decodedPayload = jwt.decode(refToken, { json: true });
  const response = new ResponseModel();
  response.message = "User Logged Out Successfully!";
  const user = decodedPayload?.user;
  console.log("REFRESH: ", user);
  try {
    if (!user) {
      response.status = 400;
      response.message = "Session Expired";
      return res.status(response.status).json(response);
    }
    const userToken = await UserToken.findOne({ userId: user.id });

    if (!userToken) {
      return res.status(response.status).json(response);
    }

    await userToken.deleteOne();
    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  refreshTokenRoute,
  deleterefreshTokenRoute,
};
