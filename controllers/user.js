const user = require("../models/user");

async function handleGetAllUser(req, res) {
  const allUser = await user.find({});
  return res
    .status(200)
    .json({ status: "All user Fetched successfully...", allUser });
}

async function handleCreateUser(req, res) {
  const body = req.body;
  if (
    !body ||
    !body.firstName ||
    !body.lastName ||
    !body.email ||
    !body.gender ||
    !body.jobTitle
  ) {
    return res.status(400).json({ status: "All fields are required!" });
  }

  const existingUser = await user.findOne({ email: body.email });
  if (existingUser) {
    return res.status(400).json({ status: "Email already exists!" });
  }

  const result = await user.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    gender: body.gender,
    jobTitle: body.jobTitle,
  });
  return res
    .status(201)
    .json({ status: "user created successfully...", result });
}

async function handleGetUserById(req, res) {
  const oneUser = await user.findById(req.params.id);
  return res.status(200).json({ status: "user fetched by id", oneUser });
}

async function handleUpdateUserById(req, res) {
  const body = req.body;
  const updateUser = await user.findByIdAndUpdate(req.params.id, body, {
    new: true,
  });
  return res
    .status(200)
    .json({ status: "user updated successfully...", updateUser });
}

async function handleDeleteUserById(req, res) {
  const delUser = await user.findByIdAndDelete(req.params.id);
  return res
    .status(200)
    .json({ status: "user deleted successfully by id", delUser });
}
module.exports = {
  handleGetAllUser,
  handleCreateUser,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
};
