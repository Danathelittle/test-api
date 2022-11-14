const bcryptjs = require("bcryptjs");
const userservice = require("../services/users.services");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const tkn = jwt.sign({ user }, "secret", { expiresIn: "1h" });
    res.cookie("jwt", tkn, { maxAge: 60 * 60 * 1000 });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const tkn = jwt.sign({ user }, "secret", { expiresIn: "1h" });
    res.cookie("jwt", tkn, { maxAge: 60 * 60 * 1000 });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.userProfile = (req, res, next) => {
  return res.status(200).json({ message: "authorized User !" });
};
