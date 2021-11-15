const express = require("express");
const { signIn, signUp, logout } = require("../../Controllers/Admin/adminAuth");
const {
  validateSignupRequest,
  validateSigninRequest,
  isRequestValidated,
} = require("../../Validators/validators");
const router = express.Router();

router.post("/admin/signup", validateSignupRequest, isRequestValidated, signUp);
router.post("/admin/signin", validateSigninRequest, isRequestValidated, signIn);
router.post("/admin/logout", logout);

module.exports = router;
