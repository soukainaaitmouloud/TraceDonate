// backend/routes/authRoutes.js

const express = require("express");

const router =
  express.Router();

/* ================================================= */
/* ================= CONTROLLERS =================== */
/* ================================================= */

const {

  registerUser,

  loginUser,

} = require(
  "../controllers/authController"
);

/* ================================================= */
/* ================= AUTH ROUTES =================== */
/* ================================================= */

/* REGISTER */

router.post(
  "/register",
  registerUser
);

/* LOGIN */

router.post(
  "/login",
  loginUser
);

module.exports = router;