import {
  THEME_LIGHT,
  THEME_DARK,
  THEME_COLORS,
  THEME_COLOR_DEFAULT,
} from "../reducers/global.action.type";

const initialState = {
  themeMode: THEME_LIGHT,
  themeColor: THEME_COLOR_DEFAULT,
};

export const globalSetting = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case THEME_LIGHT:
      return { ...state, themeMode: THEME_LIGHT };
    case THEME_DARK:
      return { ...state, themeMode: THEME_DARK };
    case THEME_COLORS:
      return { ...state, themeColor: payload.themeColor };
    default:
      return state;
  }
};
