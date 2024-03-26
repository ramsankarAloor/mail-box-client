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
    res.status(500).json({error : "server side error on signup"})
  }
};
