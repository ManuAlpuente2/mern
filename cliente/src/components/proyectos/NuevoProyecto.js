import React, { useContext, useState } from "react";

import proyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {
  const proyectosContext = useContext(proyectoContext);
  const {
    formulario,
    errorFormulario,
    mostrarFormulario,
    addProyecto,
    mostrarError,
  } = proyectosContext;

  const [proyecto, setProyecto] = useState({
    nombre: "",
  });

  const { nombre } = proyecto;

  const onChangeProyecto = (e) => {
    setProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  const submitProyecto = (e) => {
    e.preventDefault();
    //Validar
    if (nombre === "") {
      mostrarError();
      return;
    }

    //Agregar al state
    addProyecto(proyecto);

    //Reiniciar el form
    setProyecto({
      nombre: "",
    });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={() => mostrarFormulario()}
      >
        Nuevo proyecto
      </button>
      {formulario && (
        <form className="formulario-nuevo-proyecto" onSubmit={submitProyecto}>
          <input
            type="text"
            className="input-text"
            placeholder="Nombre proyecto"
            name="nombre"
            value={nombre}
            onChange={onChangeProyecto}
          ></input>
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar proyecto"
          />
        </form>
      )}
      {errorFormulario && (
        <p className="mensaje error">El nombre es obligatorio</p>
      )}
    </>
  );
};

export default NuevoProyecto;
