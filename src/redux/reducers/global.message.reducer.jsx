import {
  SHOW_MESSAGE,
  HIDE_MESSAGE,
  MESSAGE_TYPE,
  ERROR_FLAG,
} from "../reducers/global.action.type";

const initialState = {
  isShow: false,
  isType: MESSAGE_TYPE,
  isFlag: ERROR_FLAG,
  isTitle: "",
  isMessage: "",
  isSysMessage: "",
};

export const globalMessage = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SHOW_MESSAGE:
      return {
        ...state,
        isShow: true,
        isType: payload.isType,
        isFlag: payload.isFlag,
        isTitle: payload.isTitle,
        isMessage: payload.isMessage,
        isSysMessage: payload.isSysMessage,
      };
    case HIDE_MESSAGE:
      return initialState;
    default:
      return state;
  }
};


