import {
  FORMULARIO_PROYECTO,
  GET_PROYECTOS,
  ADD_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  DELETE_PROYECTO,
  PROYECTO_ERROR
} from "../../types";
//eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case FORMULARIO_PROYECTO:
      return {
        ...state,
        formulario: true,
      };
    case GET_PROYECTOS:
      return {
        ...state,
        proyectos: action.payload,
      };

    case ADD_PROYECTO:
      return {
        ...state,
        proyectos: [action.payload, ...state.proyectos],
        formulario: false,
        errorFormulario: false,
      };
    case VALIDAR_FORMULARIO:
      return {
        ...state,
        errorFormulario: true,
      };
    case PROYECTO_ACTUAL:
      return {
        ...state,
        proyecto: state.proyectos.filter(
          (proyecto) => proyecto._id === action.payload
        ),
      };
    case DELETE_PROYECTO:
      return {
        ...state,
        proyectos: state.proyectos.filter(
          (proyecto) => proyecto._id !== action.payload
        ),
        proyecto: null,
      };
      case PROYECTO_ERROR:
        return {
          ...state,
          mensaje: action.payload
        }
    default:
      return state;
  }
};
