const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearUsuario = async (req, res) => {
  console.log(req.body);

  //Revisar errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  //Extraer email y password
  const { email, password } = req.body;

  try {
    //Validar
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    //Crear segun el schema
    usuario = new Usuario(req.body);

    //Hashear password
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);

    //Guardar
    await usuario.save();

    //Crear y firmar JWT
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };

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
    res.status(400).send("Hubo un error");
  }
};
