// backend/middleware/roleMiddleware.js

/* ================================================= */
/* ================= ROLE MIDDLEWARE =============== */
/* ================================================= */

const roleMiddleware =
  (...allowedRoles) => {

    return (
      req,
      res,
      next
    ) => {

      try {

        /* ================= CHECK USER ================= */

        if (!req.user) {

          return res.status(401).json({
            success: false,
            message:
              "Unauthorized access",
          });

        }

        /* ================= CHECK ROLE ================= */

        if (
          !allowedRoles.includes(
            req.user.role
          )
        ) {

          return res.status(403).json({
            success: false,
            message:
              "Access denied. Insufficient permissions.",
          });

        }

        next();

      } catch (error) {

        console.error(
          "Role Middleware Error:",
          error
        );

        res.status(500).json({
          success: false,
          message:
            "Server error",
        });

      }

    };

  };

module.exports =
  roleMiddleware;