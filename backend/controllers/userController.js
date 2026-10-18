// backend/controllers/userController.js

const db = require("../config/db");

const bcrypt = require("bcryptjs");

/* ================================================= */
/* ================= GET MY PROFILE ================ */
/* ================================================= */

exports.getMyProfile = (
  req,
  res
) => {

  db.query(

    "SELECT * FROM users WHERE id = ?",

    [req.user.id],

    (err, result) => {

      if (err) {

        console.error(err);

        return res.status(500).json({

          success: false,

          message:
            "Database error ❌",

        });

      }

      if (
        !result ||
        result.length === 0
      ) {

        return res.status(404).json({

          success: false,

          message:
            "User not found ❌",

        });

      }

      const user =
        result[0];

      delete user.password;

      res.json({

        success: true,

        user,

      });

    }

  );

};

/* ================================================= */
/* ================= UPDATE PROFILE ================ */
/* ================================================= */

exports.updateProfile = (
  req,
  res
) => {

  const {
    fullName,
    email,
    phone,
    location,
    avatar,
  } = req.body;

  db.query(

    `
    UPDATE users
    SET
      name = ?,
      email = ?,
      phone = ?,
      location = ?,
      avatar = ?
    WHERE id = ?
    `,

    [
      fullName,
      email,
      phone,
      location,
      avatar,
      req.user.id,
    ],

    (err) => {

      if (err) {

        console.error(err);

        return res.status(500).json({

          success: false,

          message:
            "Profile update failed ❌",

        });

      }

      db.query(

        "SELECT * FROM users WHERE id = ?",

        [req.user.id],

        (err, result) => {

          if (err) {

            return res.status(500).json({

              success: false,

              message:
                "Database error ❌",

            });

          }

          const user =
            result[0];

          delete user.password;

          res.json({

            success: true,

            message:
              "Profile updated ✅",

            user,

          });

        }

      );

    }

  );

};

/* ================================================= */
/* ================= UPDATE PASSWORD =============== */
/* ================================================= */

exports.updatePassword =
  async (
    req,
    res
  ) => {

    try {

      const {
        currentPassword,
        newPassword,
      } = req.body;

      db.query(

        "SELECT * FROM users WHERE id = ?",

        [req.user.id],

        async (
          err,
          result
        ) => {

          if (err) {

            return res.status(500).json({

              success: false,

              message:
                "Database error ❌",

            });

          }

          const user =
            result[0];

          if (!user) {

            return res.status(404).json({

              success: false,

              message:
                "User not found ❌",

            });

          }

          const isMatch =
            await bcrypt.compare(
              currentPassword,
              user.password
            );

          if (!isMatch) {

            return res.status(400).json({

              success: false,

              message:
                "Current password incorrect ❌",

            });

          }

          const hashedPassword =
            await bcrypt.hash(
              newPassword,
              10
            );

          db.query(

            "UPDATE users SET password = ? WHERE id = ?",

            [
              hashedPassword,
              req.user.id,
            ],

            (err) => {

              if (err) {

                return res.status(500).json({

                  success: false,

                  message:
                    "Password update failed ❌",

                });

              }

              res.json({

                success: true,

                message:
                  "Password updated successfully ✅",

              });

            }

          );

        }

      );

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Server error ❌",

      });

    }

  };

/* ================================================= */
/* ================= DELETE ACCOUNT ================ */
/* ================================================= */

exports.deleteAccount = (
  req,
  res
) => {

  db.query(

    "DELETE FROM users WHERE id = ?",

    [req.user.id],

    (err) => {

      if (err) {

        console.error(err);

        return res.status(500).json({

          success: false,

          message:
            "Delete failed ❌",

        });

      }

      res.json({

        success: true,

        message:
          "Account deleted successfully ✅",

      });

    }

  );

};

/* ================================================= */
/* ================= GET SUMMARY =================== */
/* ================================================= */

exports.getSummary = (
  req,
  res
) => {

  db.query(

    `
    SELECT
      created_at,
      total_donations,
      requests_supported,
      lives_impacted
    FROM users
    WHERE id = ?
    `,

    [req.user.id],

    (err, result) => {

      if (err) {

        console.error(err);

        return res.status(500).json({

          success: false,

          message:
            "Database error ❌",

        });

      }

      res.json({

        success: true,

        summary:
          result[0] || {},

      });

    }

  );

};