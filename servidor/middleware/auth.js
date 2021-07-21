const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //Leeer token
  const token = req.header("x-auth-token");
  console.log(token);
  //Revisar si no hay token
  if (!token) {
    return res.status(401).json({ msg: "Falta el token" });
  }
  //Validar token
  try {
    const cifrado = jwt.verify(token, process.env.SECRETO);
    req.usuario = cifrado.usuario;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token no válido" });
  }
};
