const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email or password is missing." });
    }
    const existingEmail = await User.findOne({
      where: { email },
    });
    if (existingEmail) {
      return res.status(403).json({ error: "Email is already registered." });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPass });
    res.status(201).json({ message: "New user created." });
  } catch (error) {
    res.status(500).json({ error: "server side error on signup" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email or password is missing." });
    }
    const existingUser = await User.findOne({
      where: { email },
    });
    console.log(existingUser)
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const savedHash = existingUser.dataValues.password;
    const isPasswordMatch = await bcrypt.compare(password, savedHash);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "wrong password" });
    }
    res
      .status(200)
      .json({
        message: "login successful",
        token: generateToken(existingUser.id),
        userEmail : email
      });
  } catch (error) {
    res.status(500).json({ error: "server side error on login" });
  }
};

function generateToken(id) {
  return jwt.sign({ userId: id }, process.env.TOKEN_SECRET);
}
