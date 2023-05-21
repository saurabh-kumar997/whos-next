const express = require("express");
const {
  createGroup,
  addMembers,
  removeMembers,
} = require("../controller/groupController");
const { getGroups } = require("../controller/userController");

const groupsRoute = express.Router();

groupsRoute.post("/create-group", createGroup);

groupsRoute.post("/add-members", addMembers);
groupsRoute.post("/remove-members", removeMembers);
groupsRoute.get("/get-groups/:userId", getGroups);

module.exports = groupsRoute;
