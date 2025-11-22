require("dotenv").config();
const express = require("express");
const app = express();
const { connectDB } = require("./connection");
const userRouter = require("./routes/user");
const port = process.env.PORT || 8000;
const dbUrl = process.env.MONGODB;

connectDB(dbUrl);
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
