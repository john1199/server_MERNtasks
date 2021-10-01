const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const auth = require("../middlewares/auth");

// api/auth
router.post(
  "/",
  [
    check("email", "El email debe ser valido").isEmail(),
    check("password", "El password debe ser minimo de 6 caracteres")
      .not()
      .isEmpty(),
  ],
  authController.autenticarUser
);

router.get("/", auth, authController.userAutenticado);

module.exports = router;
