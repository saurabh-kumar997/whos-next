const express = require("express");
const {
  createGroup,
  addMembers,
  removeMembers,
  deleteGroup,
  createTask,
  deleteTask,
  markTaskAsDone,
  getGroupDataById,
  getGroups,
} = require("../controller/groupController");

const groupsRoute = express.Router();

groupsRoute.get("/get-groups", getGroups);
groupsRoute.get("/get-group-data/:groupId", getGroupDataById);
groupsRoute.post("/create-group", createGroup);
groupsRoute.delete("/delete-group/:groupId", deleteGroup);
groupsRoute.post("/create-task", createTask);
groupsRoute.post("/delete-task", deleteTask);
groupsRoute.post("/mark-task-done", markTaskAsDone);

groupsRoute.post("/add-members", addMembers);
groupsRoute.patch("/remove-members", removeMembers);

module.exports = groupsRoute;
