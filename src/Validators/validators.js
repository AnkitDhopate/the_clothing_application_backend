const { check, validationResult } = require("express-validator");

exports.validateSignupRequest = [
  check("firstName").notEmpty().withMessage("First Name is required"),
  check("lastName").notEmpty().withMessage("Last Name is required"),
  check("email").isEmail().withMessage("Enter a valid email"),
  check("contact").notEmpty().withMessage("Enter valid Phone no."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 digit long"),
];

exports.validateSigninRequest = [
  check("email").isEmail().withMessage("Enter a valid email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 digit long"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array() });
  }

  next();
};
