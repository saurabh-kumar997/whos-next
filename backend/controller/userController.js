const User = require("../model/UserModels");
const Groups = require("../model/GroupModel");
const ResponseModel = require("../model/responseModel");
const { selectNextMember } = require("../utility/utility");

const secureRoute = async (req, res, next) => {
  const resp = new ResponseModel();
  try {
    throw new Error("ERROR OCCURED");
    // res.json({
    //   message: "You made it to the secure route",
    //   user: req.user,
    //   token: req.get("x-token"),
    // });
  } catch (err) {
    // console.error(err);
    next(err);
  }
};

const updateProfileData = async (req, res, next) => {
  try {
    const response = new ResponseModel();
    const userData = req.user;
    const body = req.body;

    await User.findByIdAndUpdate(userData.id, {
      name: body.name,
      email: body.email,
    });

    response.message = "User Data Updated Successfully";
    res.status(response.status).json(response);
  } catch (err) {
    next(err);
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    const response = new ResponseModel();
    const userData = req.user;

    const user = await User.findById(userData.id);
    const groups = [...user?.groups];
    await user?.deleteOne();

    console.log("DELETEONE RAN", groups);

    if (groups?.length > 0) {
      await Promise.all(
        groups.map(async (groupId) => {
          const group = await Groups.findById(groupId);

          console.log("GROUP", group);
          if (group?.members?.length === 1) {
            return group.deleteOne();
          } else {
            let nextMember = group.admin;
            if (group?.admin?.eqauls(userData.id)) {
              nextMember = selectNextMember(group.members, userData.id);
            }
            return group.updateOne({
              $pull: { members: userData.id },
              $set: { admin: nextMember },
            });
          }
        })
      );
      response.message = "User Deleted Successfully";
      res.status(response.status).json(response);
    }

    response.status = 304;
    response.message = "User Deletion unsuccessfully";
    res.status(response.status).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  secureRoute,
  updateProfileData,
  deleteAccount,
};
