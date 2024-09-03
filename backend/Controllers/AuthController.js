const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

exports.SignUp = async (req, res) => {
  const { firstName, lastName, email, password, country, city } = req.body;

  const checkingEmail = await User.findOne({ email });

  if (checkingEmail) {
    return res.status(400).json({ message: "Email already exists" });
  }
  try {
    NewUser = new User({
      firstName,
      lastName,
      email,
      password,
      country,
      city,
    });
    await NewUser.save();
    res.status(200).json({ message: "Registred successfuly" });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "Email not found" });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const token = JWT.sign({ userId: user._id }, "Fushaar", {
      expiresIn: "1d",
    });
    res.status(200).json({ message: "Logged in", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
