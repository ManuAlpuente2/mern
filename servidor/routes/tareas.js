const express = require("express");
const router = express.Router();
const tareaController = require("../controllers/tareaController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//Crear tarea

// api/tareas

router.post(
  "/",
  auth,
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("proyecto", "El proyecto es obligatorio").not().isEmpty(),
  ],
  tareaController.crearTarea
);

//Get tareas
router.get("/", auth, tareaController.getTareas);

//Put tareas
router.put("/:id", auth, tareaController.actualizarTarea);

//Eliminar
router.delete("/:id", auth, tareaController.deleteTarea);

module.exports = router;
