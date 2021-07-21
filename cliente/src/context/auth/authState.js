import React, { useReducer } from 'react';

import AuthContext from './authContext';
import authReducer from './authReducer';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

import { REGISTRO_EXITOSO, REGISTRO_ERROR, GET_USUARIO, LOGIN_EXITOSO, LOGIN_ERROR, CERRAR_SESION } from "../../types";

const AuthState = props => {

  const initialState = {
    token: localStorage.getItem('token'),
    autenticado: null,
    usuario: null,
    msg: null,
    cargando: true
  }

  const [state, dispatch] = useReducer(authReducer, initialState);

  const registrarUsuario = async datos => {
    try {
      const respuesta = await clienteAxios.post('/api/usuarios', datos);

      console.log(respuesta);

      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data
      });

      usuarioAutenticado();

    } catch (error) {
      console.log(error.response.data.msg);
      const alerta = {
        msg: error.response.data.msg,
        cat: 'alerta-error'
      }

      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta
      })
    }
  }

  //Devolver usuario
  const usuarioAutenticado = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      //FN para enviar token
      tokenAuth(token);

    }
    try {
      const respuesta = await clienteAxios.get('/api/auth');
      console.log(respuesta);
      dispatch({
        type: GET_USUARIO,
        payload: respuesta.data.usuario
      })

    } catch (error) {
      console.log(error.response);
      dispatch({
        type: LOGIN_ERROR
      })
    }
  }

  const iniciarSesion = async datos => {
    try{
      const respuesta = await clienteAxios.post('/api/auth', datos);
      console.log(respuesta);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data
      });

      usuarioAutenticado();

    }catch (error){
      console.log(error.response.data.msg);
      const alerta = {
        msg: error.response.data.msg,
        cat: 'alerta-error'
      }

      dispatch({
        type: LOGIN_ERROR,
        payload: alerta
      })
    }
  }

  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION
    })
  }

  return (
    <AuthContext.Provider value={{
      token: state.token,
      autenticado: state.autenticado,
      usuario: state.usuario,
      msg: state.msg,
      cargando: state.cargando,
      registrarUsuario,
      iniciarSesion,
      usuarioAutenticado,
      cerrarSesion
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState;