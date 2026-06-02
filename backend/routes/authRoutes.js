const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  updatePremium
} = require("../controllers/authController");

const protect =
  require("../middleware/authMiddleware");
  console.log({
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  updatePremium
});

router.post(
  "/register",
  registerUser
);

router.post(
  "/login",
  loginUser
);

router.get(
  "/profile",
  protect,
  getProfile
);
router.put(
  "/profile",
  protect,
  updateProfile
);

router.put(
  "/premium",
  protect,
  updatePremium
);

module.exports = router;