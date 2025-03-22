const express = require("express");
const {
  signup,
  login,
  logout,
  renderSignup,
  renderLogin,
} = require("../controllers/auth");

const router = express.Router();

router.get("/signup", renderSignup);
router.get("/login", renderLogin);
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
