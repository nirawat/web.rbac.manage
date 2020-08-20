import {
  TYPE_PERMISSION_ROLE,
  MANAGE_PERMISSION_ROLE,
  REQUEST,
} from "../global.action.type";

const initialState = {
  groupCode: "",
  groupName: "",
};

export const reducerPermissionRole = (state = initialState, action) => {
  const { type, handle, payload } = action;
  if (type === TYPE_PERMISSION_ROLE) {
    switch (handle) {
      case MANAGE_PERMISSION_ROLE:
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
