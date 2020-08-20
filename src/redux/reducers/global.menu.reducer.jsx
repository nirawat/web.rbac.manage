import {
  OPEN_AND_CLOSE_MENU,
  ACTIVE_MENU,
  SET_ALERT,
  REMOVE_ALERT,
  MENU_ACTIVE_STATUS,
} from "../reducers/global.action.type";

const initialState = {
  menuShow: false,
  menuActive: MENU_ACTIVE_STATUS,
  menuName: "",
  currentFuncCode: "",
  currentFuncName: "",
  urlRoute: "",
  alertShow: false,
  alertSeverity: "error",
  alertMessage: "",
};

export const globalMenu = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case OPEN_AND_CLOSE_MENU:
      return {
        ...state,
        menuShow: payload.menuShow,
      };
    case ACTIVE_MENU:
      return {
        ...state,
        menuActive: payload.menuActive,
        menuName: payload.menuName,
        currentFuncCode: payload.currentFuncCode,
        currentFuncName: payload.currentFuncName,
        urlRoute: payload.urlRoute,
      };
    case SET_ALERT:
      return {
        ...state,
        alertShow: payload.alertShow,
        alertSeverity: payload.alertSeverity,
        alertMessage: payload.alertMessage,
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alertShow: false,
      };
    default:
      return state;
  }
};
