import {
  TYPE_PERMISSION_FUNC,
  MANAGE_PERMISSION_FUNC,
  REQUEST,
} from "../global.action.type";

const initialState = {
  groupCode: "",
  groupName: "",
};

export const reducerPermissionFunc = (state = initialState, action) => {
  const { type, handle, payload } = action;
  if (type === TYPE_PERMISSION_FUNC) {
    switch (handle) {
      case MANAGE_PERMISSION_FUNC:
        return {
          ...state,
          groupCode: payload.groupCode,
          groupName: payload.groupName,
        };
      case REQUEST:
        return {
          ...state,
          data: payload,
        };
      default:
        return state;
    }
  } else {
    return state;
  }
};
