import {
  TAREAS_PROYECTO,
  ADD_TAREA,
  VALIDAR_TAREA,
  DELETE_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA
} from "../../types";
//eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case TAREAS_PROYECTO:
      return {
        ...state,
        tareasProyecto: action.payload,
      };
    case ADD_TAREA:
      return {
        ...state,
        tareasProyecto: [action.payload, ...state.tareasProyecto],
        errorTarea: false,
      };
    case VALIDAR_TAREA:
      return {
        ...state,
        errorTarea: true,
      };
    case DELETE_TAREA:
      return {
        ...state,
        tareasProyecto: state.tareasProyecto.filter((tarea) => tarea._id !== action.payload),
      };
    case ACTUALIZAR_TAREA:
      return {
        ...state,
        tareasProyecto: state.tareasProyecto.map((tarea) =>
          tarea._id === action.payload._id ? action.payload : tarea
        ),
      };
    case TAREA_ACTUAL:
      return {
        ...state,
        tareaSeleccionada: action.payload,
      };
    case LIMPIAR_TAREA:
      return {
        ...state,
        tareaSeleccionada: null,
      };
    default:
      return state;
  }
};
