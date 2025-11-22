require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 8000;

const dbUrl = process.env.MONGODB;
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log(`connection error: ${err}`);
  });

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema);
app.use(express.urlencoded({ extended: false }));
app.get("/api/users", async (req, res) => {
  const allUser = await user.find({});
  return res
    .status(200)
    .json({ status: "All user Fetched successfully...", allUser });
});
app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const oneUser = await user.findById(req.params.id);
    return res.status(200).json({ status: "user fetched by id", oneUser });
  })
  .patch(async (req, res) => {
    const body = req.body;
    const updateUser = await user.findByIdAndUpdate(req.params.id, body, {
      new: true,
    });
    return res
      .status(200)
      .json({ status: "user updated successfully...", updateUser });
  })
  .delete(async (req, res) => {
    const delUser = await user.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ status: "user deleted successfully by id", delUser });
  });

app.post("/api/users", async (req, res) => {
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
  const result = await user.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    gender: body.gender,
    jobTitle: body.jobTitle,
  });
  return res.status(201).json({ status: "user created successfully..." });
});
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
