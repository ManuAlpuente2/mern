import { REGISTRO_EXITOSO, REGISTRO_ERROR, GET_USUARIO, LOGIN_EXITOSO, LOGIN_ERROR, CERRAR_SESION } from "../../types";
//eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {

    case REGISTRO_EXITOSO:
    case LOGIN_EXITOSO:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        autenticado: true,
        msg: null,
        cargando: false
      }
    case GET_USUARIO:
      return {
        ...state,
        autenticado: true,
        usuario: action.payload,
        cargando: false
      }

    case CERRAR_SESION:
    case REGISTRO_ERROR:
    case LOGIN_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        usuario: null,
        autenticado: null,
        msg: action.payload,
        cargando: false
      }

    default:
      return state;
  }

}