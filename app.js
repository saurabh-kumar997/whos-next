const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const userRoute = require("./routes/userRoutes");
const secRoute = require("./routes/secureRoute");
const groupsRoute = require("./routes/groupsRoute");

require("./auth/auth");
require("dotenv").config();

const PORT = process.env.PORT;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", userRoute);
app.use(
  "/api/group",
  passport.authenticate("jwt", { session: false }),
  groupsRoute
);
app.use(
  "/api/user",
  passport.authenticate("jwt", { session: false }),
  secRoute
);

// app.get("/", (req, res) => {
//   res.json({ messgage: "Hello World" });
// });

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.json(err);
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
