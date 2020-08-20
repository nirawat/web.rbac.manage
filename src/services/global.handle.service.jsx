import { httpClient } from "./httpClient";
import {
  REQUEST,
  INSERT,
  UPDATE,
  DELETE,
} from "../redux/reducers/global.action.type";
import {
  GlobalMessageShow,
  GlobalLoadingData,
  GlobalLoadingEvent,
  SpecialInsertDispatch,
} from "./global.function.service";

export const GlobalRequest = async (dispatch, type) => {
  GlobalLoadingData(dispatch, true);
  let resp = await httpClient.get(`Rbac/GetList${type}`);
  if (resp.status === 200) {
    dispatch({ type: type, handle: REQUEST, payload: resp.data });
  }
  GlobalLoadingData(dispatch, false);
  return resp;
};

export const GlobalInsert = async (dispatch, type, data) => {
  GlobalLoadingEvent(dispatch, true);
  let resp = await httpClient.post(`Rbac/Add${type}`, data);
  if (resp.status === 200) {
    dispatch({
      type: type,
      handle: INSERT,
      payload: SpecialInsertDispatch(type, data, resp),
    });
  }
  GlobalLoadingEvent(dispatch, false);
  GlobalMessageShow(dispatch, resp);
  return resp;
};

export const GlobalUpdate = async (dispatch, type, data) => {
  GlobalLoadingEvent(dispatch, true);
  let resp = await httpClient.post(`Rbac/Update${type}`, data);
  if (resp.status === 200) {
    dispatch({ type: type, handle: UPDATE, payload: data });
  }
  GlobalLoadingEvent(dispatch, false);
  GlobalMessageShow(dispatch, resp);
  return resp;
};

export const GlobalDelete = async (dispatch, type, data) => {
  GlobalLoadingEvent(dispatch, true);
  let resp = await httpClient.post(`Rbac/Delete${type}`, data);
  if (resp.status === 200) {
    dispatch({ type: type, handle: DELETE, payload: data });
  }
  GlobalLoadingEvent(dispatch, false);
  GlobalMessageShow(dispatch, resp);
  return resp;
};


