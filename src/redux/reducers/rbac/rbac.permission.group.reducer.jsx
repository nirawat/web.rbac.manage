import {
  TYPE_PERMISSION_GROUP,
  MANAGE_PERMISSION_GROUP,
  REQUEST,
} from "../global.action.type";

const initialState = {
  groupCode: "",
  groupName: "",
};

export const reducerPermissionGroup = (state = initialState, action) => {
  const { type, handle, payload } = action;
  if (type === TYPE_PERMISSION_GROUP) {
    switch (handle) {
      case MANAGE_PERMISSION_GROUP:
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
