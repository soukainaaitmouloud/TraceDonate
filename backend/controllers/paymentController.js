// backend/controllers/paymentController.js

const Stripe = require("stripe");

/* ================================================= */
/* ================= STRIPE ======================== */
/* ================================================= */

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY
);

/* ================================================= */
/* ============ CREATE PAYMENT INTENT ============== */
/* ================================================= */

const createPaymentIntent =
  async (req, res) => {
    try {
      const { amount } =
        req.body;

      /* ================= VALIDATION ================= */

      if (
        !amount ||
        amount <= 0
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "Invalid amount",
          });
      }

      /* ================= CREATE PAYMENT ================= */

      const paymentIntent =
        await stripe.paymentIntents.create(
          {
            amount:
              Math.round(
                amount * 100
              ),

            currency:
              "usd",

            automatic_payment_methods:
              {
                enabled: true,
              },
          }
        );

      /* ================= RESPONSE ================= */

      res.status(200).json({
        success: true,

        clientSecret:
          paymentIntent.client_secret,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,

        message:
          "Payment failed",
      });
    }
  };

/* ================================================= */
/* ================= EXPORT ======================== */
/* ================================================= */

module.exports = {
  createPaymentIntent,
};