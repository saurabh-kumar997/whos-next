const { default: mongoose } = require("mongoose");
const Groups = require("../model/GroupModel");
const User = require("../model/UserModels");
const ResponseModel = require("../model/responseModel");
const { selectNextMember } = require("../utility/utility");

const createGroup = async (req, res) => {
  const body = req.body;
  const user = req.user;
  const response = new ResponseModel();

  if (user) {
    const { id } = user;
    const data = {
      admin: id,
      groupName: body.groupName,
      members: [id],
      tasks: [],
    };

    const group = await Groups.create(data);
    response.data = {
      groupId: group._id,
      groupName: group.groupName,
    };
    res.status(response.status).json(response);
  }
};

const addMembers = async (req, res) => {
  const body = req.body;
  const user = req.user;
  const response = new ResponseModel();

  if (user) {
    const { email, groupId } = body;

    const memberUser = await User.findOne({ email });

    if (memberUser) {
      await Groups.findByIdAndUpdate(groupId, {
        $push: { members: memberUser._id },
      });
      await memberUser.updateOne({ $push: { groups: groupId } });

      response.message = `${memberUser.name} added to the Group`;
      res.status(response.status).json(response);
    } else {
      response.status = 404;
      response.message = `The user ${email} doesn't exist`;
      res.status(response.status).json(response);
    }
  }
};

const removeMembers = async (req, res) => {
  const body = req.body;
  const response = new ResponseModel();

  const { email, groupId } = body;

  const memberUser = await User.findOne({ email });

  const groupData = await Groups.findById(groupId);
  if (!groupData.admin.eqauls(memberUser._id)) {
    const nextMember = selectNextMember(groupData.members, memberUser._id);

    console.log("nextMember", nextMember);

    const tasks = groupData.tasks.map((task) => {
      if (task.toBeDoneBy.equals(memberUser._id)) {
        task.toBeDoneBy = nextMember;
      }
      return task;
    });

    console.log("TASKS", tasks);

    await Groups.findByIdAndUpdate(groupId, {
      $pull: { members: memberUser._id },
      $set: { tasks: [...tasks] },
    });

    await User.findOneAndUpdate({ email }, { $pull: { groups: groupId } });

    response.message = `${memberUser.name} removed from the Group`;
  } else {
    response.message = `${memberUser.name} is admin, You cannot remove admin`;
  }

  res.status(response.status).json(response);
};

const deleteGroup = async (req, res) => {
  const { groupId } = req.params;
  const response = new ResponseModel();
  const user = req.user;
  const group = await Groups.findOne({ _id: groupId });
  if (group.admin.equals(user.id)) {
    const members = group.members;

    await Promise.all(
      members.map(async (member) => {
        await User.findByIdAndUpdate(member, { $pull: { groups: groupId } });
      })
    );

    response.message = "Group deleted successfully";
    response.status = 200;
  } else {
    response.message = "You dont have access to this action";
    response.status = 401;
  }

  res.status(response.status).json(response);
};

const createTask = async (req, res) => {
  const body = req.body;
  const response = new ResponseModel();
  const taskReq = {
    _id: new mongoose.Types.ObjectId(),
    taskName: body.taskName,
    createdDate: body.createdDate,
    toBeDoneBy: body.toBeDoneBy,
    activity: [],
  };
  const group = await Groups.findOne({ _id: body.groupId });

  const isTaskNameExist = group.tasks.filter(
    (task) => task.taskName === body.taskName
  );

  if (!(isTaskNameExist.length > 0)) {
    await group.updateOne({
      $push: {
        tasks: { ...taskReq },
      },
    });

    response.message = "Task created successfully";
    response.status = 200;
    response.data = taskReq;
  } else {
    response.message = "Task already exist";
    response.status = 409;
  }

  res.status(response.status).json(response);
};

const deleteTask = async (req, res) => {
  const body = req.body;
  const response = new ResponseModel();

  await Groups.findByIdAndUpdate(body.groupId, {
    $pull: { tasks: { _id: body.taskId } },
  });
  response.message = "Task deleted successfully";
  response.status = 200;

  res.status(response.status).json(response);
};

const markTaskAsDone = async (req, res) => {
  const { groupId, taskId } = req.body;
  const response = new ResponseModel();
  const user = req.user;

  const group = await Groups.findById(groupId);

  const tasks = group.tasks.map((task) => {
    if (task._id.equals(taskId) && task.toBeDoneBy.equals(user.id)) {
      const activity = {
        lastDoneBy: task.toBeDoneBy,
        doneOnDate: Date.now(),
      };
      const nextMember = selectNextMember(group.members, task.toBeDoneBy);
      task.toBeDoneBy = nextMember;
      task.activity = [...task.activity, activity];
    }
    return task;
  });

  await group.updateOne({
    $set: { tasks: [...tasks] },
  });

  response.message = `Task completed successfully`;
  res.status(response.status).json(response);
};

module.exports = {
  createGroup,
  addMembers,
  removeMembers,
  deleteGroup,
  createTask,
  deleteTask,
  markTaskAsDone,
};
