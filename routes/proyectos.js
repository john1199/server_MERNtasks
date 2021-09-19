const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const proyectoController = require("../controllers/proyectoController");
const auth = require("../middlewares/auth");

// api/proyectos
router.post(
  "/",
  auth,
  [check("nombre", "El nombre es obligatorio").not().isEmpty()],
  proyectoController.crearProyecto
);

router.get("/", auth, proyectoController.obtenerProyectos);

module.exports = router;
