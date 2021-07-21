import React, { useState, useContext, useEffect } from "react";

import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const FormTarea = () => {
  const [tarea, setTarea] = useState({
    nombre: "",
  });

  const { nombre } = tarea;

  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const {
    errorTarea,
    tareaSeleccionada,
    addTarea,
    validarTarea,
    getTareas,
    editTarea,
    limpiarTarea
  } = tareasContext;

  useEffect(() => {
    if (tareaSeleccionada !== null) {
      setTarea(tareaSeleccionada);
    } else {
      setTarea({
        nombre: "",
      });
    }
  }, [tareaSeleccionada]);

  //Si no hay proyecto
  if (!proyecto) return null;

  const [proyectoActual] = proyecto;

  const handleChange = (e) => {
    setTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //validar
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }

    //Edición o nueva tarea
    if (tareaSeleccionada === null) {
      addTarea(tarea, proyectoActual._id);
    } else {
      editTarea(tarea, proyectoActual._id);
      limpiarTarea();
    }

    //agregar tarea

    //reiniciar form

    //obtener tareas
    getTareas(proyectoActual._id);

    setTarea({
      nombre: "",
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre tarea"
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value={tareaSeleccionada ? "Editar tarea" : "Agregar tarea"}
          />
        </div>
      </form>
      {errorTarea && (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      )}
    </div>
  );
};

export default FormTarea;