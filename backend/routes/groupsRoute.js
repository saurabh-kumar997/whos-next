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

groupsRoute.post("/create-group", createGroup);

groupsRoute.post("/add-members", addMembers);
groupsRoute.patch("/remove-members", removeMembers);
groupsRoute.get("/get-groups", getGroups);
groupsRoute.delete("/delete/:groupId", deleteGroup);
groupsRoute.post("/create-task", createTask);
groupsRoute.post("/delete-task", deleteTask);
groupsRoute.post("/mark-task-done", markTaskAsDone);
groupsRoute.post("/get-groups", markTaskAsDone);
groupsRoute.get("/get-group-data/:groupId", getGroupDataById);

module.exports = groupsRoute;
