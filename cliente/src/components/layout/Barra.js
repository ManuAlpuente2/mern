import React, { useEffect, useContext } from "react";
import AuthContext from "../../context/auth/authContext";


const Barra = () => {
  //Info usuario
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado, usuario, cerrarSesion } = authContext;

  useEffect(() => {
    usuarioAutenticado();
    //eslint-disable-next-line
  }, []);

  return (
    <header className="app-header">
      <p className="nombre-usuario">
        Hola {usuario && (<span>{usuario.nombre}</span>)}
      </p>
      <nav className="nav-principal">
        <button className="btn btn-blank btn-cerrar-sesion" onClick={() => { cerrarSesion() }}>Cerrar sesión</button>
      </nav>
    </header>
  );
};

export default Barra;
