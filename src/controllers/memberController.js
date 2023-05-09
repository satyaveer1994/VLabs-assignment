const memberModel = require("../models/memberModel");

exports.getAllMembers = async (req, res) => {
  try {
    const members = await memberModel.find({});
    res.json(members);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.addMember = async (req, res) => {
  const { name, email } = req.body;

  // Validate input
  if (!name || !email) {
    return res
      .status(400)
      .send({ status: false, msg: "Missing required fields" });
  }

  // Create new user
  try {
    const member = await memberModel.create({ name, email });
    res.status(201).json(member);
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, msg: error.msg });
  }
};

exports.updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const updatedMember = await memberModel.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );
    if (!updatedMember) {
      return res.sendStatus(404);
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMember = await memberModel.findByIdAndDelete(id);
    if (!deletedMember) {
      return res.sendStatus(404);
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
