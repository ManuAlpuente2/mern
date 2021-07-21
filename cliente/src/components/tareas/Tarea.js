import React, { useContext } from "react";

import tareaContext from "../../context/tareas/tareaContext";
import proyectoContext from "../../context/proyectos/proyectoContext";

const Tarea = ({ tarea }) => {
  const tareasContext = useContext(tareaContext);
  const { deleteTarea, getTareas, editTarea, setTareaActual } =
    tareasContext;

  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  //Proyecto
  const [proyectoActual] = proyecto;

  const clickEliminar = (id) => {
    deleteTarea(id, proyectoActual._id);
    getTareas(proyectoActual._id);
  };

  const cambiarEstadoTarea = (tarea) => {
    tarea.estado = !tarea.estado;
    editTarea(tarea);
  };

  const setTarea = (tarea) => {
    setTareaActual(tarea);
  };

  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>
      <div className="estado">
        {tarea.estado ? (
          <button
            type="button"
            className="completo"
            onClick={() => cambiarEstadoTarea(tarea)}
          >
            Completo
          </button>
        ) : (
          <button
            type="button"
            className="incompleto"
            onClick={() => cambiarEstadoTarea(tarea)}
          >
            Incompleto
          </button>
        )}
      </div>
      <div className="acciones">
        <button
          type="button"
          className="btn btn-primario"
          onClick={() => setTarea(tarea)}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => clickEliminar(tarea._id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Tarea;
