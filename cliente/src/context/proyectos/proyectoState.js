import React, { useReducer } from "react";

import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";

import {
  FORMULARIO_PROYECTO,
  GET_PROYECTOS,
  ADD_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  DELETE_PROYECTO,
  PROYECTO_ERROR
} from "../../types";

import clienteAxios from "../../config/axios";

const ProyectoState = (props) => {
  const initialState = {
    formulario: false,
    proyectos: [],
    errorFormulario: false,
    proyecto: null,
    mensaje: null
  };

  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  //CRUD
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO
    });
  };

  const getProyectos = async () => {
    try {
      const resultado = await clienteAxios.get('/api/proyectos');
      console.log(resultado);
      dispatch({
        type: GET_PROYECTOS,
        payload: resultado.data.proyectos
      })
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: 'Hubo un error',
        cat: 'alerta-error'
      }
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  const addProyecto = async (proyecto) => {
    try {
      const resultado = await clienteAxios.post('/api/proyectos', proyecto);
      console.log(resultado);
      dispatch({
        type: ADD_PROYECTO,
        payload: resultado.data
      })
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: 'Hubo un error',
        cat: 'alerta-error'
      }
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO,
    });
  };

  //Seleccionar proyecto actual
  const proyectoActual = (proyectoId) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoId,
    });
  };

  const deleteProyecto = async (proyectoId) => {
    try {
      await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
      dispatch({
        type: DELETE_PROYECTO,
        payload: proyectoId,
      });
      const alerta = {
        msg: 'Proyecto eliminado',
        cat: 'alerta-ok'
      }
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    } catch (error) {
      const alerta = {
        msg: 'Hubo un error',
        cat: 'alerta-error'
      }
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  return (
    <proyectoContext.Provider
      value={{
        formulario: state.formulario,
        proyectos: state.proyectos,
        errorFormulario: state.errorFormulario,
        proyecto: state.proyecto,
        mensaje: state.mensaje,
        mostrarFormulario,
        getProyectos,
        addProyecto,
        mostrarError,
        proyectoActual,
        deleteProyecto
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
