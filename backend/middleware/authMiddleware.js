// backend/middleware/authMiddleware.js

const jwt = require("jsonwebtoken");

const authMiddleware = (
  req,
  res,
  next
) => {

  try {

    /* ================= GET TOKEN ================= */

    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith(
        "Bearer "
      )
    ) {

      return res.status(401).json({
        success: false,
        message:
          "Access denied. No token provided.",
      });

    }

    /* ================= EXTRACT TOKEN ================= */

    const token =
      authHeader.split(" ")[1];

    /* ================= VERIFY TOKEN ================= */

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    /* ================= SAVE USER ================= */

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();

  } catch (error) {

    console.error(
      "Auth Middleware Error:",
      error.message
    );

    return res.status(401).json({
      success: false,
      message:
        "Invalid or expired token.",
    });

  }

};

module.exports =
  authMiddleware;