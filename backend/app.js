const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
const secRoutes = require("./routes/userRoute");
const groupsRoutes = require("./routes/groupsRoute");
const ResponseModel = require("./model/responseModel");
const cors = require("cors");

require("./auth/auth");
require("dotenv").config();

const PORT = process.env.PORT;

const corsOption = {
  origin: "*",
  optionsSuccessStatus: 200,
};
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOption));

app.use("/api", authRoutes);
app.use(
  "/api/group",
  passport.authenticate("jwt", { session: false }),
  groupsRoutes
);
app.use(
  "/api/user",
  passport.authenticate("jwt", { session: false }),
  secRoutes
);

app.use(function (err, req, res, next) {
  console.error(err);
  const resp = new ResponseModel();
  resp.status = err.status || 500;
  resp.error = "Something went wrong!";
  res.status(resp.status);
  res.json(resp);
});

mongoose
  .connect(
    "mongodb://localhost:27017/whos-next?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000"
  )
  .then(() => {
    console.log("DB CONNECTED");
    app.listen(PORT, () => {
      console.log(`Running on ${PORT}...`);
    });
  })
  .catch((err) => console.log("ERROR", err));
