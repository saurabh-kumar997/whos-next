const User = require("./UserModels");
const mongoose = require("mongoose");

const activitySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  lastDoneBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  doneOnDate: mongoose.SchemaTypes.Date,
});

const taskSchema = mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  taskName: {
    type: String,
    required: true,
  },
  toBeDoneBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  createdDate: mongoose.SchemaTypes.Date,
  activity: [activitySchema],
});

const GroupSchema = mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  admin: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  groupName: String,
  members: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  tasks: [taskSchema],
});

GroupSchema.pre("save", async function (next) {
  const group = this;
  console.log("GROUP", group);

  this._id = new mongoose.Types.ObjectId();
  next();
});

GroupSchema.post("save", async function () {
  const group = this;

  console.log("GROUP", this);

  await User.findByIdAndUpdate(this.admin, {
    $push: { groups: this._id },
  });
});

GroupSchema.statics.getGroupData = async function (groupId) {
  return await this.findById(groupId)
    .populate({
      path: "members",
      model: "User",
      select: "_id email name",
    })
    .populate({
      path: "tasks.toBeDoneBy",
      model: "User",
      select: "_id name",
    })
    .populate({
      path: "tasks.activity.lastDoneBy",
      model: "User",
      select: "_id name",
    });
};

const Groups = mongoose.model("Groups", GroupSchema);
module.exports = Groups;
