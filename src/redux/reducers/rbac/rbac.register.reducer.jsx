import {
  TYPE_REGISTER,
  HANDLE_MODE,
  ACTIVE_REGISTER_MODE,
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
    register_id: "",
    system_id: "",
    token: "",
    name_thai: "",
    name_eng: "",
    address: "",
    email: "",
    website: "",
    tel: "",
    fax: "",
    contact: "",
    country: "",
    register_date: new Date(Date.now()).toLocaleDateString("en-GB"),
    activate: false,
  },
};

export const reducerRegister = (state = initialState, action) => {
  const { type, handle, payload } = action;
  if (type === TYPE_REGISTER) {
    switch (handle) {
      case HANDLE_MODE:
        return {
          ...state,
          isMode: payload.isMode,
          model: payload.isMode === NEW ? state.model : payload.model,
        };
      case ACTIVE_REGISTER_MODE:
        return {
          ...state,
          data: [
            ...state.data.map((e) => {
              if (e.register_id !== payload.model.register_id) {
                e.activate = payload.activate;
                return e;
              }
              return payload.model;
            }),
          ],
        };
      case REQUEST:
        return {
          ...state,
          data: payload,
        };
      case INSERT:
        payload.data.register_id = payload.register_id;
        return {
          ...state,
          data: [...state.data, payload.data],
        };
      case UPDATE:
        return {
          ...state,
          data: [
            ...state.data.map((e) => {
              if (e.register_id !== payload.register_id) {
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
            ...state.data.filter((e) => e.register_id !== payload.register_id),
          ],
        };
      default:
        return state;
    }
  } else {
    return state;
  }
};
