const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const shortid = require("shortid");

const storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cd) {
    cd(null, shortid.generate() + "-" + file.originalname);
  },
});

exports.upload = multer({ storage });

exports.requireSignIn = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } else {
    return res.status(400).json({ error: "Authorization required" });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({ req: req.user });
  }
  next();
};

exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(400).json({ error: "Access Denied" });
  }
  next();
};
