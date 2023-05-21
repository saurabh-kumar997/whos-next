const Groups = require("../model/GroupModel");
const User = require("../model/UserModels");
const ResponseModel = require("../model/responseModel");

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

    // const getGroupDetail = await User.
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
      await User.findOneAndUpdate({ email }, { $push: { groups: groupId } });

      // response.data = {
      //   groupId: group._id,
      //   groupName: group.groupName,
      // };
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

  await Groups.findByIdAndUpdate(groupId, {
    $pull: { members: memberUser._id },
  });
  await User.findOneAndUpdate({ email }, { $pull: { groups: groupId } });

  response.message = `${memberUser.name} removed from the Group`;
  res.status(response.status).json(response);
};

const deleteGroup = async (req, res) => {
  const { groupId } = req.params;
  const response = new ResponseModel();

  await Groups.findByIdAndDelete(groupId);
};

module.exports = {
  createGroup,
  addMembers,
  removeMembers,
};
