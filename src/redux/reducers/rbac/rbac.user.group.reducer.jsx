import {
  TYPE_USER_GROUP,
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
    group_level: 0,
    theme_code: "",
    create_date: "",
    count_member: 0,
    count_role: 0,
    count_func: 0,
  },
};

export const reducerUserGroup = (state = initialState, action) => {
  const { type, handle, payload } = action;
  if (type === TYPE_USER_GROUP) {
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
          data: [...state.data.filter((e) => e.code !== payload.code)],
        };
      default:
        return state;
    }
  } else {
    return state;
  }
};
