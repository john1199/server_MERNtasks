const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

exports.crearProyecto = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }
  try {
    const proyecto = new Proyecto(req.body);
    proyecto.creador = req.user.id;
    proyecto.save();
    res.status(200).json({ msg: "Proyecto creado correctamente", proyecto });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Error al crear proyecto" });
  }
};

exports.obtenerProyectos = async (req, res) => {
  try {
    const listProyectos = await Proyecto.find({ creador: req.user.id });
    console.log(listProyectos);
    res.status(200).json({
      msg: "Lista de proyectos obtenida correctamente",
      listProyectos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al obtener proyecto" });
  }
};
