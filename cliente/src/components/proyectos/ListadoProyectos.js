import React, { useContext, useEffect } from "react";
import Proyecto from "./Proyecto";

import proyectoContext from "../../context/proyectos/proyectoContext";
import AlertaContext from "../../context/alertas/alertaContext";

import { CSSTransition, TransitionGroup } from "react-transition-group";

const ListadoProyectos = () => {
  const proyectosContext = useContext(proyectoContext);
  const { mensaje, proyectos, getProyectos } = proyectosContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  useEffect(() => {

    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.cat);
    }

    getProyectos();
    // eslint-disable-next-line
  }, [mensaje]);

  if (proyectos.length === 0)
    return <p>No hay proyectos, crea uno para empezar</p>;

  return (
    <ul className="listado-proyectos">
      {alerta && (
        <div className={`alerta ${alerta.cat}`}>{alerta.msg}</div>
      )}
      <TransitionGroup>
        {proyectos.map((proyecto) => (
          <CSSTransition key={proyecto._id} timeout={200} classNames="proyecto">
            <Proyecto proyecto={proyecto} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListadoProyectos;
