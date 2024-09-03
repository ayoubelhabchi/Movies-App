const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const User = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  joinedIn: {
    type: Date,
    default: Date.now,
  },
});

User.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, 10, (error, hash) => {
      if (error) return next(error);
      this.password = hash;
      next();
    });
  } else {
    next();
  }
});

module.exports = mongoose.model("User", User);
