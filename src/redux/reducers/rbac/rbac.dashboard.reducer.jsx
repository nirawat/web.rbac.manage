import {
  TYPE_DASHBOARD,
  DASHBOARD_WIDGET_1,
  DASHBOARD_WIDGET_2,
  DASHBOARD_WIDGET_3,
  DASHBOARD_WIDGET_4,
  DASHBOARD_WIDGET_5,
} from "../global.action.type";

const initialState = {
  data_widget1: [],
  data_widget2: [],
  data_widget3: [],
  data_widget4: [],
  data_widget5: [],
};

export const reducerDashboard = (state = initialState, action) => {
  const { type, handle, payload } = action;
  if (type === TYPE_DASHBOARD) {
    switch (handle) {
      case DASHBOARD_WIDGET_1:
        return {
          ...state,
          data_widget1: payload,
        };
      case DASHBOARD_WIDGET_2:
        return {
          ...state,
          data_widget2: payload,
        };
      case DASHBOARD_WIDGET_3:
        return {
          ...state,
          data_widget3: payload,
        };
      case DASHBOARD_WIDGET_4:
        return {
          ...state,
          data_widget4: payload,
        };
      case DASHBOARD_WIDGET_5:
        return {
          ...state,
          data_widget5: payload,
        };
      default:
        return state;
    }
  } else {
    return state;
  }
};
