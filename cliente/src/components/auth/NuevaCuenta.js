import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/auth/authContext";

const NuevaCuenta = (props) => {

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { registrarUsuario, msg, autenticado } = authContext;

  useEffect(() => {
    if (autenticado) {
      props.history.push('/proyectos')
    }
    if (msg) {
      mostrarAlerta(msg.msg, msg.cat);
    }
    //eslint-disable-next-line
  }, [msg, autenticado, props.history])

  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    password2: "",
  });

  const { nombre, email, password, password2 } = usuario;

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    //Validar campos vacios
    if (nombre.trim() === "" || email.trim() === "" || password.trim() === "" || password2.trim() === "") {
      mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
      return;
    }

    //Password minimo 6 chars
    if (password.length < 6) {
      mostrarAlerta('El password debe ser de al menos 6 caracteres', 'alerta-error');
      return;
    }

    //Los 2 password iguales
    if (password !== password2) {
      mostrarAlerta('Los passwords no son iguales', 'alerta-error');
      return;
    }

    //pasar datos
    registrarUsuario({ nombre, email, password });

  };

  return (
    <div className="form-usuario">
      {alerta && (<div className={`alerta ${alerta.cat}`}>
        {alerta.msg}
      </div>)}
      <div className="contenedor-form sombra-dark">
        <h1>Crear una cuenta</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="nombre">Tu nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu nombre"
              onChange={onChange}
              value={nombre}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu email"
              onChange={onChange}
              value={email}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Tu password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu password"
              onChange={onChange}
              value={password}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password2">Confirmar password</label>
            <input
              type="password"
              id="password2"
              name="password2"
              placeholder="Tu password"
              onChange={onChange}
              value={password2}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar sesión"
            />
          </div>
        </form>
        <Link to={"/"} className="enlace-cuenta">
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
