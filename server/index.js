// index.js
const mongoose = require("mongoose");
const app = require("./server.js");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 5000;

dotenv.config();

mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database Connection Online");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log({ message: "Error connecting to database", stack: error });
  }
};

connect();
console.log(`Server is running on port ${PORT}`);
