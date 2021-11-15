const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortId = require("shortid");
const env = require("dotenv");
env.config();

exports.signUp = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user) {
      return res
        .status(406)
        .json({ message: "User with entered email already exists" });
    } else {
      const { firstName, lastName, email, contact, password } = req.body;

      const hash_password = await bcrypt.hash(password, 10);

      const newUser = new User({
        firstName,
        lastName,
        email,
        contact,
        hash_password,
        userName: shortId.generate(),
      });

      newUser.save((error, createdUser) => {
        if (error) {
          return res.status(400).json({ message: `Error: ${error}` });
        }

        if (createdUser) {
          return res
            .status(201)
            .json({ message: "User registered SuccessFully" });
        }
      });
    }
  });
};

exports.signIn = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return res.status(400).json({ message: "Something went wrong" });

    if (user) {
      const isAuth = await user.authenticate(req.body.password);
      if (isAuth) {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );

        const {
          _id,
          firstName,
          lastName,
          email,
          contact,
          userName,
          fullName,
        } = user;

        return res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            contact,
            userName,
            fullName,
            role: "user",
          },
        });
      } else {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
};
