//Rutas para auth
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const authController = require("../controllers/authController");

//Crear usuario
// api/auth
router.post(
  "/",
  authController.authUser
);

router.get('/',
  auth,
  authController.usuarioAutenticado
)

module.exports = router;
