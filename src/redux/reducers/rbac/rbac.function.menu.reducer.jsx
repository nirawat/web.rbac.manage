import {
  TYPE_FUNCTION_MENU,
  HANDLE_MODE,
  NEW,
  REQUEST,
  INSERT,
  UPDATE,
  DELETE,
} from "../global.action.type";

const initialState = {
  isMode: NEW,
  data: [],
  model: {
    code: "",
    name_thai: "",
    name_eng: "",
    route_path: "",
    icon_name: "",
    func_type: "",
    func_ref_sub: "",
  },
};

export const reducerFuncMenu = (state = initialState, action) => {
  const { type, handle, payload } = action;
  if (type === TYPE_FUNCTION_MENU) {
    switch (handle) {
      case HANDLE_MODE:
        return {
          ...state,
          isMode: payload.isMode,
          model: payload.isMode === NEW ? state.model : payload.model,
        };
      case REQUEST:
        return {
          ...state,
          data: payload,
        };
      case INSERT:
        return {
          ...state,
          data: [...state.data, payload],
        };
      case UPDATE:
        return {
          ...state,
          data: [
            ...state.data.map((e) => {
              if (e.code !== payload.code) {
                return e;
              }
              return payload;
            }),
          ],
        };
      case DELETE:
        return {
          ...state,
          data: [
            ...state.data.filter((e) => e.code !== payload.code),
          ],
        };
      default:
        return state;
    }
  } else {
    return state;
  }
};
