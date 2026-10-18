// backend/controllers/requestController.js

const db = require("../config/db");

/* ================================================= */
/* ================= CREATE REQUEST ================ */
/* ================================================= */

const createRequest = (
  req,
  res
) => {

  res.json({
    success: true,
    message:
      "createRequest works ✅",
  });

};

/* ================================================= */
/* ================= GET ALL ======================= */
/* ================================================= */

const getAllRequests = (
  req,
  res
) => {

  res.json({
    success: true,
    message:
      "getAllRequests works ✅",
  });

};

/* ================================================= */
/* ================= GET ONE ======================= */
/* ================================================= */

const getRequestById = (
  req,
  res
) => {

  res.json({
    success: true,
    message:
      "getRequestById works ✅",
  });

};

/* ================================================= */
/* ================= DELETE ======================== */
/* ================================================= */

const deleteRequest = (
  req,
  res
) => {

  res.json({
    success: true,
    message:
      "deleteRequest works ✅",
  });

};

/* ================================================= */
/* ================= EXPORTS ======================= */
/* ================================================= */

module.exports = {

  createRequest,

  getAllRequests,

  getRequestById,

  deleteRequest,

};