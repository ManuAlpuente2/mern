import React, { useContext } from "react";

import proyectoContext from "../../context/proyectos/proyectoContext";

import tareaContext from "../../context/tareas/tareaContext";

import Tarea from "./Tarea";

import { CSSTransition, TransitionGroup } from "react-transition-group";

const ListadoTareas = () => {
  const proyectosContext = useContext(proyectoContext);
  const { proyecto, deleteProyecto } = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const { tareasProyecto } = tareasContext;

  //Si no hay proyecto
  if (!proyecto) return <h2>Selecciona un proyecto</h2>;

  const [proyectoActual] = proyecto;

  const clickEliminar = () => {
    deleteProyecto(proyectoActual._id);
  };

  return (
    <>
      <h2>Proyecto: {proyectoActual.nombre}</h2>
      <ul className="listado-tareas">
        {tareasProyecto.length === 0 ? (
          <li className="tarea">
            <p>No hay tareas</p>
          </li>
        ) : (
          <TransitionGroup>
            {tareasProyecto.map((tarea) => (
              <CSSTransition key={tarea._id} timeout={200} classNames="tarea">
                <Tarea tarea={tarea} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
      <button
        type="button"
        className="btn btn-eliminar"
        onClick={clickEliminar}
      >
        Eliminar proyecto &times;
      </button>
    </>
  );
};

export default ListadoTareas;
