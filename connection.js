const mongoose = require("mongoose");

async function connectDB(url) {
  return mongoose
    .connect(url)
    .then(() => {
      console.log("mongodb connected");
    })
    .catch((err) => {
      console.log(`connection error: ${err}`);
    });
}


module.exports = {connectDB}