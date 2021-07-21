import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/auth/authContext";

const Login = (props) => {

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { iniciarSesion, msg, autenticado } = authContext;


  useEffect(() => {
    if (autenticado) {
      props.history.push('/proyectos')
    }
    if (msg) {
      console.log(msg);
      mostrarAlerta(msg.msg, msg.cat);
    }
    //eslint-disable-next-line
  }, [msg, autenticado, props.history])

  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });

  const { email, password } = usuario;

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    //Validar
    if (email.trim() === "" || password.trim() === "") {
      mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
    }
    //pasar datos
    iniciarSesion({ email, password });

  };

  return (
    <div className="form-usuario">
      {alerta && (<div className={`alerta ${alerta.cat}`}>
        {alerta.msg}
      </div>)}
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar sesión</h1>
        <form onSubmit={onSubmit}>
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
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar sesión"
            />
          </div>
        </form>
        <Link to={"/nueva-cuenta"} className="enlace-cuenta">
          Crear cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
