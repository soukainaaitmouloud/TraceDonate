// backend/routes/paymentRoutes.js

const express = require("express");

const router = express.Router();

/* ================================================= */
/* ================= CONTROLLER ==================== */
/* ================================================= */

const {
  createPaymentIntent,
} = require(
  "../controllers/paymentController"
);

/* ================================================= */
/* ================= TEST ROUTE ==================== */
/* ================================================= */

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "Payment routes working ✅",
  });
});

/* ================================================= */
/* ============ CREATE PAYMENT INTENT ============== */
/* ================================================= */

router.post(
  "/create-payment-intent",
  createPaymentIntent
);

/* ================================================= */
/* ================= EXPORT ======================== */
/* ================================================= */

module.exports = router;