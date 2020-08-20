import {
  TYPE_USER,
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
    account_id: "",
    email: "",
    password: "",
    prefixes: "",
    first_name: "",
    last_name: "",
    language: "EN",
    section_code: "",
    section_name: "",
    activate_date: new Date(Date.now()),
  },
};

export const reducerUser = (state = initialState, action) => {
  const { type, handle, payload } = action;
  if (type === TYPE_USER) {
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
        payload.data.account_id = payload.account_id;
        return {
          ...state,
          data: [...state.data, payload.data],
        };
      case UPDATE:
        return {
          ...state,
          data: [
            ...state.data.map((e) => {
              if (e.account_id !== payload.account_id) {
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
            ...state.data.filter((e) => e.account_id !== payload.account_id),
          ],
        };
      default:
        return state;
    }
  } else {
    return state;
  }
};
