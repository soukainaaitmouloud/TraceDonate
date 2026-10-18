// backend/controllers/donationController.js

const db = require("../config/db");

/* ================================================= */
/* ================= CREATE DONATION =============== */
/* ================================================= */

const createDonation = async (
  req,
  res
) => {

  try {

    const {
      amount,
      message,
      requestId,
    } = req.body;

    const amountNumber =
      parseFloat(amount);

    /* ================= VALIDATION ================= */

    if (
      isNaN(amountNumber) ||
      amountNumber <= 0
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Invalid donation amount",
      });

    }

    if (!requestId) {

      return res.status(400).json({
        success: false,
        message:
          "Request ID is required",
      });

    }

    /* ================= SAVE DONATION ================= */

    await db.query(

      `
      INSERT INTO donations
      (
        user_id,
        request_id,
        amount,
        message
      )
      VALUES (?, ?, ?, ?)
      `,

      [
        1,
        requestId,
        amountNumber,
        message || "",
      ]
    );

    res.status(201).json({

      success: true,

      message:
        "Donation completed successfully",

    });

  } catch (error) {

    console.error(
      "Create Donation Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Server error",
    });

  }

};

/* ================================================= */
/* ================= GET MY DONATIONS ============== */
/* ================================================= */

const getMyDonations = async (
  req,
  res
) => {

  try {

    const [donations] =
      await db.query(

        `
        SELECT
          d.id,
          d.amount,
          d.message,
          d.created_at,

          r.title,
          r.image

        FROM donations d

        LEFT JOIN requests r
        ON d.request_id = r.id

        WHERE d.user_id = ?

        ORDER BY d.id DESC
        `,

        [1]
      );

    res.status(200).json({

      success: true,

      donations,

    });

  } catch (error) {

    console.error(
      "Get Donations Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Server error",
    });

  }

};

/* ================================================= */
/* ================= GET DONATION SUMMARY ========== */
/* ================================================= */

const getDonationSummary = async (
  req,
  res
) => {

  try {

    const [summary] =
      await db.query(

        `
        SELECT

          COUNT(*) AS totalDonations,

          COALESCE(
            SUM(amount),
            0
          ) AS totalAmount

        FROM donations

        WHERE user_id = ?
        `,

        [1]
      );

    res.status(200).json({

      success: true,

      summary:
        summary[0],

    });

  } catch (error) {

    console.error(
      "Donation Summary Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Server error",
    });

  }

};

/* ================================================= */
/* ================= EXPORTS ======================= */
/* ================================================= */

module.exports = {

  createDonation,

  getMyDonations,

  getDonationSummary,

};