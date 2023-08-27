const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: String,
  date: mongoose.SchemaTypes.Date,
  groups: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "Groups",
    default: [],
  },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this._id = new mongoose.Types.ObjectId();
  this.name = user.name;
  this.password = hash;
  this.date = new Date().toISOString();
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;

  const compare = bcrypt.compare(password, user.password);

  return compare;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
