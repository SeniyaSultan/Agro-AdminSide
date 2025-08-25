const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Private routes
router.get("/me", protect, getMe);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

// Forgot & Reset password routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;












// const express = require('express');
// const router = express.Router();
// const {
//   signup,
//   login,
//   getMe,
//   forgotPassword,
//   resetPassword
//   // updateProfile
// } = require('../controllers/authController');
// const { protect } = require('../middleware/authMiddleware');

// // Public routes
// router.post("/signup", signup);
// router.post("/login", login);

// // Private route
// router.get("/me", protect, getMe);

// // Forgot & Reset password routes
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password", resetPassword);

// module.exports = router;
