const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const secRoutes = require("./routes/userRoute");
const groupsRoutes = require("./routes/groupsRoute");
const {
  authenticateMiddleware,
  errorHandlerMiddleware,
} = require("./middleware/middleware");
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

app.use("/api/group", authenticateMiddleware, groupsRoutes);
app.use("/api/user", authenticateMiddleware, secRoutes);

app.use(errorHandlerMiddleware);

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
