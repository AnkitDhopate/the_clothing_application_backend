const mongoose = require("mongoose");
const env = require("dotenv");

env.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@cluster0.g8xah.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("Connected to the Database");
  })
  .catch((error) => {
    console.log(`Error in connecting to the database : ${error}`);
  });
