import {
  SHOW_MESSAGE,
  ALERT_TYPE,
  SUCCESS_FLAG,
  ERROR_FLAG,
  SET_LOADING,
  SET_LOADING_DATA,
  TYPE_USER,
  TYPE_REGISTER,
} from "../redux/reducers/global.action.type";

export function GlobalMessageShow(dispatch, response) {
  dispatch({
    type: SHOW_MESSAGE,
    payload: {
      isType: ALERT_TYPE,
      isFlag: response.status === 200 ? SUCCESS_FLAG : ERROR_FLAG,
      isMessage: response.message,
    },
  });
}

export function GlobalLoadingData(dispatch, isLoading) {
  dispatch({
    type: SET_LOADING_DATA,
    payload: { isLoadingData: isLoading },
  });
}

export function GlobalLoadingEvent(dispatch, isLoading) {
  dispatch({
    type: SET_LOADING,
    payload: { isLoading: isLoading },
  });
}

export function SpecialInsertDispatch(type, data, resp) {
  switch (type) {
    case TYPE_USER:
      return { data: data, account_id: resp.account_id };
    case TYPE_REGISTER:
      return { data: data, system_id: resp.system_id };
    default:
      return data;
  }
}
