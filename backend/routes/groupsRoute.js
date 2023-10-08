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
  updateGroup,
} = require("../controller/groupController");

const groupsRoute = express.Router();

groupsRoute.get("/get-groups", getGroups);
groupsRoute.get("/get-group-data/:groupId", getGroupDataById);
groupsRoute.post("/create-group", createGroup);
groupsRoute.delete("/delete-group/:groupId", deleteGroup);
groupsRoute.patch("/update-group/:groupId", updateGroup);
groupsRoute.post("/add-members", addMembers);
groupsRoute.post("/remove-members", removeMembers);
groupsRoute.post("/create-task", createTask);
groupsRoute.post("/delete-task", deleteTask);
groupsRoute.post("/mark-task-done", markTaskAsDone);

module.exports = groupsRoute;
