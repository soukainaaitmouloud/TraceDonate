// backend/controllers/authController.js

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const db = require("../config/db");

/* ================================================= */
/* ================= GENERATE TOKEN ================ */
/* ================================================= */

const generateToken = (id) => {

  return jwt.sign(

    { id },

    process.env.JWT_SECRET,

    {
      expiresIn: "7d",
    }

  );

};

/* ================================================= */
/* ================= REGISTER ====================== */
/* ================================================= */

const registerUser = async (
  req,
  res
) => {

  try {

    const {
      name,
      email,
      password,
      role,
    } = req.body;

    /* ================= VALIDATION ================= */

    if (
      !name ||
      !email ||
      !password ||
      !role
    ) {

      return res.status(400).json({

        success: false,

        message:
          "All fields are required",

      });

    }

    /* ================= CHECK USER ================= */

    const [existingUsers] =
      await db.query(

        "SELECT * FROM users WHERE email = ?",

        [email]

      );

    if (
      existingUsers.length > 0
    ) {

      return res.status(400).json({

        success: false,

        message:
          "User already exists",

      });

    }

    /* ================= HASH PASSWORD ================= */

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    /* ================= INSERT USER ================= */

    const [result] =
      await db.query(

        `
        INSERT INTO users
        (name, email, password, role)
        VALUES (?, ?, ?, ?)
        `,

        [
          name,
          email,
          hashedPassword,
          role,
        ]

      );

    /* ================= RESPONSE ================= */

    res.status(201).json({

      success: true,

      message:
        "User registered successfully",

      token: generateToken(
        result.insertId
      ),

      user: {

        id:
          result.insertId,

        name,

        email,

        role,

      },

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message:
        "Server Error",

    });

  }

};

/* ================================================= */
/* ================= LOGIN ========================= */
/* ================================================= */

const loginUser = async (
  req,
  res
) => {

  try {

    const {
      email,
      password,
    } = req.body;

    /* ================= VALIDATION ================= */

    if (
      !email ||
      !password
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Email and password required",

      });

    }

    /* ================= FIND USER ================= */

    const [users] =
      await db.query(

        "SELECT * FROM users WHERE email = ?",

        [email]

      );

    if (
      users.length === 0
    ) {

      return res.status(400).json({

        success: false,

        message:
          "User not found",

      });

    }

    const user =
      users[0];

    /* ================= CHECK PASSWORD ================= */

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid credentials",

      });

    }

    /* ================= RESPONSE ================= */

    res.status(200).json({

      success: true,

      message:
        "Login successful",

      token: generateToken(
        user.id
      ),

      user: {

        id: user.id,

        name: user.name,

        email: user.email,

        role: user.role,

      },

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message:
        "Server Error",

    });

  }

};

/* ================================================= */
/* ================= EXPORTS ======================= */
/* ================================================= */

module.exports = {

  registerUser,

  loginUser,

};