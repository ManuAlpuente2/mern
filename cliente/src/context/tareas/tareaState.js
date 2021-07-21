import React, { useReducer } from "react";
import TareaContext from "./tareaContext";
import tareaReducer from "./tareaReducer";

import {
  TAREAS_PROYECTO,
  ADD_TAREA,
  VALIDAR_TAREA,
  DELETE_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA
} from "../../types";

import clienteAxios from "../../config/axios";

const TareaState = (props) => {
  const initialState = {
    tareasProyecto: [],
    errorTarea: false,
    tareaSeleccionada: null,
  };

  const [state, dispatch] = useReducer(tareaReducer, initialState);

  const getTareas = async (proyecto) => {
    try {
      const resultado = await clienteAxios.get('/api/tareas', { params: { proyecto } });
      console.log(resultado);
      dispatch({
        type: TAREAS_PROYECTO,
        payload: resultado.data.tareas,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addTarea = async (tarea, proyecto) => {
    tarea.proyecto = proyecto;
    console.log(tarea);
    try {
      const resultado = await clienteAxios.post('/api/tareas', tarea);
      console.log(resultado);
      dispatch({
        type: ADD_TAREA,
        payload: resultado.data.tarea,
      })
    } catch (error) {
      console.log(error);
    }

  };

  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };

  const deleteTarea = async (id, proyecto) => {
    try {
      await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } });
      dispatch({
        type: DELETE_TAREA,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editTarea = async (tarea, proyecto) => {
    console.log(tarea);
    try {
      const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
      console.log(resultado);
      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: resultado.data.tarea,
      });
    } catch (error) {
      console.log(error);
    }

  };


  const setTareaActual = (tarea) => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea,
    });
  };

  const limpiarTarea = () => {
    dispatch({
      type: LIMPIAR_TAREA
    })
  }

  return (
    <TareaContext.Provider
      value={{
        tareasProyecto: state.tareasProyecto,
        errorTarea: state.errorTarea,
        tareaSeleccionada: state.tareaSeleccionada,
        validarTarea,
        getTareas,
        addTarea,
        deleteTarea,
        setTareaActual,
        editTarea,
        limpiarTarea
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaState;
