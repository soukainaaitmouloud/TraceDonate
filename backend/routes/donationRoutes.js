const express = require("express");

const router = express.Router();

/* ================================================= */
/* ================= DATABASE ====================== */
/* ================================================= */

const db = require(
  "../config/db"
);

/* ================================================= */
/* ================= CONTROLLER ==================== */
/* ================================================= */

const {
  createDonation,
} = require(
  "../controllers/donationController"
);

/* ================================================= */
/* ================= GET USER DONATIONS ============ */
/* ================================================= */

router.get(
  "/:userId",

  async (req, res) => {

    try {

      const userId =
        req.params.userId;

      const [donations] =
        await db.query(

          `
          SELECT *
          FROM donations
          WHERE user_id = ?
          ORDER BY created_at DESC
          `,

          [userId]

        );

      res.json({

        success: true,

        donations,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Failed to fetch donations",

      });

    }

  }
);

/* ================================================= */
/* ================= CREATE DONATION =============== */
/* ================================================= */

router.post(
  "/",
  createDonation
);

/* ================================================= */
/* ================= EXPORT ======================== */
/* ================================================= */

module.exports = router;