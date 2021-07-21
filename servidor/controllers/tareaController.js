const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");
//Crea una nueva tarea

exports.crearTarea = async (req, res) => {
  //Revisar errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  try {
    //Extraer proyecto
    const { nombre, proyecto } = req.body;

    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      return res.status(404).json({ msg: "Hubo un error" });
    }

    //Revisar si el proyecto corresponde al usuario
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //Crear tarea
    const tarea = new Tarea({nombre, proyecto});
    await tarea.save();
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Hubo un error");
  }
};

//Get tareas by id
exports.getTareas = async (req, res) => {
  try {
    //Extraer proyecto
    const { proyecto } = req.query;

    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      return res.status(404).json({ msg: "Hubo un error" });
    }

    //Revisar si el proyecto corresponde al usuario
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //Obtener tareas
    const tareas = await Tarea.find({ proyecto }).sort({ creado: -1 });
    res.json({ tareas });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Hubo un error");
  }
};

//Actualizar Tarea by id
exports.actualizarTarea = async (req, res) => {
  try {
    //Extraer proyecto
    const { proyecto, nombre, estado } = req.body;

    let tarea = await Tarea.findById(req.params.id);

    if (!tarea) {
      return res.status(404).json({ msg: "La tarea no existe" });
    }

    const existeProyecto = await Proyecto.findById(proyecto);

    if (!existeProyecto) {
      return res.status(404).json({ msg: "Hubo un error" });
    }

    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //actualizar tarea
    const nuevaTarea = {};

    nuevaTarea.nombre = nombre;
    nuevaTarea.estado = estado;

    //actualizar proyecto
    tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, {
      new: true,
    });
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error en el servidor: ${error}`);
  }
};

exports.deleteTarea = async (req, res) => {
  try {
    //Extraer proyecto
    const { proyecto } = req.query;

    let tarea = await Tarea.findById(req.params.id);

    //Si existe...
    if (!tarea) {
      console.log("error id");
      return res.status(404).json({ msg: "Tarea no encontrado" });
    }

    const existeProyecto = await Proyecto.findById(proyecto);

    if (!existeProyecto) {
      return res.status(404).json({ msg: "Hubo un error" });
    }

    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //Eliminar el proyecto
    await Tarea.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Tarea eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
};
