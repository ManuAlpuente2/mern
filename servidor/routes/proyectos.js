const express = require("express");
const router = express.Router();
const proyectoController = require("../controllers/proyectoController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//Crear proyecto
// api/proyectos
router.post(
  "/",
  //Crear proyecto
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
  proyectoController.crearProyecto
);

//Obtener proyectos
router.get("/", auth, proyectoController.getProyectos);

//Actualizar proyecto por ID
router.put(
  "/:id",
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
  proyectoController.actualizarProyecto
);

//Eliminar proyecto por ID
router.delete("/:id", auth, proyectoController.eliminarProyecto);

module.exports = router;
