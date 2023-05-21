const mongoose = require("mongoose");
const User = require("./UserModels");

const activitySchema = mongoose.Schema({
  lastDoneBy: String,
  doneOnDate: mongoose.SchemaTypes.Date,
});

const taskSchema = mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  taskName: {
    type: String,
    required: true,
    lastDoneBy: String,
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

GroupSchema.post("save", async function (next) {
  const group = this;

  await User.findByIdAndUpdate(group.admin, {
    $push: { groups: group._id },
  });

  console.log("NEXT", next);
});

const Groups = mongoose.model("Groups", GroupSchema);
module.exports = Groups;
