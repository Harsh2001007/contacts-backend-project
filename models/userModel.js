const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is mandatory"],
    },
    email: {
      type: String,
      required: [true, "email is mandatory"],
      unique: [true, "email must be unique"],
    },
    password: {
      type: String,
      required: [true, "password is mandatory"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
