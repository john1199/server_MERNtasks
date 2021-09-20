const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

exports.crearTarea = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }
  try {
    const { proyectoId } = req.body;
    const proyecto = await Proyecto.findById(proyectoId);
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }
    if (proyecto.creador.toString() !== req.user.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.status(200).json({ msg: "Tarea creada correctamente", tarea });
  } catch (error) {
    res.status(400).json({ msg: "Error al crear tarea", error });
  }
};

exports.obtenerTareas = async (req, res) => {
  try {
    const { proyectoId } = req.body;
    const proyecto = await Proyecto.findById(proyectoId);
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }
    if (proyecto.creador.toString() !== req.user.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }
    const listTareas = await Tarea.find({ proyectoId });
    res.status(200).json({
      msg: "Lista de tareas obtenida correctamente",
      listTareas,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener proyecto", error });
  }
};

exports.actualizarTareas = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }
  try {
    const id = req.params.id;
    const { proyectoId, nombre, estado } = req.body;
    let tarea = await Tarea.findById(id);
    if (!tarea) {
      return res.status(404).json({ msg: "No existe la tarea" });
    }
    const proyecto = await Proyecto.findById(proyectoId);
    if (proyecto.creador.toString() !== req.user.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }
    const updateTarea = {};
    if (nombre) {
      updateTarea.nombre = nombre;
    }
    if (estado) {
      updateTarea.estado = estado;
    }

    tarea = await Tarea.findByIdAndUpdate(
      { _id: id },
      { $set: updateTarea },
      { new: true }
    );
    res.status(200).json({
      msg: "Tarea actualizado correctamente",
      tarea,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar tarea", error });
  }
};

exports.eliminarTarea = async (req, res) => {
  try {
    const id = req.params.id;
    const { proyectoId} = req.body;
    let tarea = await Tarea.findById(id);
    if (!tarea) {
      return res.status(404).json({ msg: "No existe la tarea" });
    }
    const proyecto = await Proyecto.findById(proyectoId);
    if (proyecto.creador.toString() !== req.user.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }
    const deleteTarea = await Tarea.findOneAndRemove({ _id: id });
    res.status(200).json({
      msg: "Tarea eliminada correctamente",
      id: deleteTarea.id,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar proyecto", error });
  }
};
