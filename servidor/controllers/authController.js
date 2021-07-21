const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.authUser = async (req, res) => {
  //Revisar errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  const { email, password } = req.body;

  try {
    //Revisar si usuario es registrado
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }

    //Revisar password
    const passwordOk = await bcryptjs.compare(password, usuario.password);
    if (!passwordOk) {
      return res.status(400).json({ msg: "Password incorrecto" });
    }

    //Crear y firmar JWT
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };

    //Validacion OK
    //Firmar
    jwt.sign(
      payload,
      process.env.SECRETO,
      {
        expiresIn: 3600, //1h
      },
      (error, token) => {
        if (error) throw error;

        //Confirmación
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

//Obtiene current usuario
exports.usuarioAutenticado = async (req, res) => {
  try{
    const usuario = await Usuario.findById(req.usuario.id).select('-password');
    res.json({usuario});
  }catch (error){
    console.log(error);
    res.status(500).json({msg: 'Hubo un error'});
  }
}