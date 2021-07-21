//US: admin
//PW: PO9YXq2xSnMcuWb1

const express = require("express");
const connectDB = require("./config/db.js");
const cors = require('cors');

//Crear server
const app = express();
connectDB();

//Habilitar cors
app.use(cors());

//Habilitar express.json
app.use(express.json({ extended: true }));

//Puerto de la app
const PORT = process.env.PORT || 4000;

//Rutas de la app
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/proyectos", require("./routes/proyectos"));
app.use("/api/tareas", require("./routes/tareas"));

//Arrancar la app
app.listen(PORT, () => {
  console.log(`Escuchando el puerto: ${PORT}`);
});
