const express = require("express");
const app = express();
const env = require("dotenv");
const connection = require("./connection");
const cors = require("cors");
const path = require("path");

const authenticateRoute = require("./Routes/authentication");
const adminAuthRoute = require("./Routes/Admin/adminAuth");
const categoryRoute = require("./Routes/category");
const productRoute = require("./Routes/product");
const cartRoute = require("./Routes/cart");

env.config();
connection;

app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));

app.use("/api", authenticateRoute);
app.use("/api", adminAuthRoute);
app.use("/api", categoryRoute);
app.use("/api", productRoute);
app.use("/api", cartRoute);

app.listen(process.env.PORT, () => {
  console.log(`Running server at PORT ${process.env.PORT}`);
});
