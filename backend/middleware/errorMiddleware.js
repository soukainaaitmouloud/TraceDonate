// backend/middleware/errorMiddleware.js

/* ================================================= */
/* ================= NOT FOUND ===================== */
/* ================================================= */

const notFound = (
  req,
  res,
  next
) => {

  const error =
    new Error(
      `Route Not Found - ${req.originalUrl}`
    );

  res.status(404);

  next(error);

};

/* ================================================= */
/* ================= ERROR HANDLER ================= */
/* ================================================= */

const errorHandler = (
  err,
  req,
  res,
  next
) => {

  const statusCode =
    res.statusCode === 200
      ? 500
      : res.statusCode;

  res.status(statusCode);

  console.error(
    "🔥 Server Error:",
    err.message
  );

  res.json({

    success: false,

    message:
      err.message ||
      "Internal Server Error",

    stack:
      process.env.NODE_ENV ===
      "production"
        ? null
        : err.stack,

  });

};

module.exports = {

  notFound,

  errorHandler,

};