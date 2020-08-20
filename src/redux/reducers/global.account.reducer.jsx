import {
  ACCOUNT_INFO_WRITE_DATA,
  ACCOUNT_INFO_CLEAR_DATA,
} from "../reducers/global.action.type";

const initialState = {
  account_info: "",
};

export const globalAccount = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACCOUNT_INFO_WRITE_DATA:
      state.account_info = payload.account_info;
      return state;
    case ACCOUNT_INFO_CLEAR_DATA:
      state.account_info = "";
      return state;
    default:
      return state;
  }
};
