import { SET_LOADING, SET_LOADING_DATA } from "../reducers/global.action.type";

const initialState = {
  isLoading: false,
  isLoadingData: false,
  isSkeleton: ["h1", "h3", "body1", "caption", "caption", "caption"],
};

export const globalLoading = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: payload.isLoading,
      };
    case SET_LOADING_DATA:
      return {
        ...state,
        isLoadingData: payload.isLoadingData,
      };
    default:
      return state;
  }
};
