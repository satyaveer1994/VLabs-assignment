const jwt = require("jsonwebtoken");
//const User = require("../models/User");
const userModel = require("../models/userModel");

exports.register = async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res
      .status(400)
      .send({ status: false, msg: "Missing required fields" });
  }

  // Create new user
  try {
    const user = await userModel.create({ username, password });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, msg: error.msg });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.sendStatus(401);
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.sendStatus(401);
    }
    const token = jwt.sign(
      { username: user.username, role: user.role },
      "secret-key",
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
