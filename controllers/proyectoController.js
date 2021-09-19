const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

exports.crearProyecto = async (req, res) => {
  revisarValidacion(req, res);
  try {
    const proyecto = new Proyecto(req.body);
    proyecto.creador = req.user.id;
    proyecto.save();
    res.status(200).json({ msg: "Proyecto creado correctamente", proyecto });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Error al crear proyecto", error });
  }
};

exports.obtenerProyectos = async (req, res) => {
  try {
    const listProyectos = await Proyecto.find({ creador: req.user.id });
    res.status(200).json({
      msg: "Lista de proyectos obtenida correctamente",
      listProyectos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al obtener proyecto", error });
  }
};

exports.actualizarProyectos = async (req, res) => {
  revisarValidacion(req, res);
  const { nombre } = req.body;
  const updateProyecto = {};
  if (nombre) {
    updateProyecto.nombre = nombre;
  }
  try {
    const id = req.params.id;
    let proyecto = await Proyecto.findById(id);
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }
    if (proyecto.creador.toString() !== req.user.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }
    proyecto = await Proyecto.findByIdAndUpdate(
      { _id: id },
      { $set: updateProyecto },
      { new: true }
    );
    res.status(200).json({
      msg: "Proyecto actualizado correctamente",
      proyecto,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al actualizar proyecto", error });
  }
};

const revisarValidacion = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }
};
