// backend/routes/userRoutes.js

const express = require("express");

const router =
  express.Router();

/* ================= MIDDLEWARE ================= */

const authMiddleware = require(
  "../middleware/authMiddleware"
);

/* ================= CONTROLLERS ================= */

const {

  updateProfile,

  updatePassword,

  deleteAccount,

  getSummary,

  getMyProfile,

} = require(
  "../controllers/userController"
);

/* ================================================= */
/* ================= USER PROFILE ================== */
/* ================================================= */

/* GET CURRENT USER PROFILE */

router.get(
  "/me",

  authMiddleware,

  getMyProfile
);

/* UPDATE PROFILE */

router.put(
  "/profile",

  authMiddleware,

  updateProfile
);

/* ================================================= */
/* ================= PASSWORD ====================== */
/* ================================================= */

router.put(
  "/password",

  authMiddleware,

  updatePassword
);

/* ================================================= */
/* ================= ACCOUNT ======================= */
/* ================================================= */

router.delete(
  "/account",

  authMiddleware,

  deleteAccount
);

/* ================================================= */
/* ================= DASHBOARD SUMMARY ============= */
/* ================================================= */

router.get(
  "/summary",

  authMiddleware,

  getSummary
);

module.exports = router;