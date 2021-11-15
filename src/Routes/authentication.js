const express = require("express");
const { signUp, signIn } = require("../Controllers/authenticate");
const {
  validateSignupRequest,
  validateSigninRequest,
  isRequestValidated,
} = require("../Validators/validators");
const router = express.Router();

router.post("/signup", validateSignupRequest, isRequestValidated, signUp);
router.post("/signin", validateSigninRequest, isRequestValidated, signIn);

module.exports = router;
