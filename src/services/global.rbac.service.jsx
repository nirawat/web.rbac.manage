import { httpClient } from "./httpClient";
import {
  ACTIVE_REGISTER_MODE,
  REQUEST,
} from "../redux/reducers/global.action.type";
import {
  GlobalMessageShow,
  GlobalLoadingEvent,
} from "./global.function.service";

export const ActivateRegister = async (dispatch, type, data) => {
  GlobalLoadingEvent(dispatch, true);
  let resp = await httpClient.post("Rbac/ActivateRegistered", data);
  if (resp.status === 200) {
    dispatch({
      type: type,
      handle: ACTIVE_REGISTER_MODE,
      payload: { model: data, activate: true },
    });
  }
  GlobalLoadingEvent(dispatch, false);
  GlobalMessageShow(dispatch, resp);
  return resp;
};

//Permission Function Menu ------------------------------------------------

export const PermissionFuncGetItem = async (dispatch, type, GroupCode) => {
  let resp = await httpClient.get(`Rbac/GetListPermissionFunc/${GroupCode}`);
  if (resp.status === 200) {
    dispatch({
      type: type,
      handle: REQUEST,
      payload: resp.data,
    });
  }
  return resp;
};

export const PermissionFuncUpdate = async (GroupCode, data) => {
  let resp = await httpClient.post(
    `Rbac/UpdatePermissionFunc/${GroupCode}`,
    data
  );
  return resp;
};

//Permission Group --------------------------------------------------------
export const PermissionGroupGetItem = async (dispatch, type, GroupCode) => {
  let resp = await httpClient.get(`Rbac/GetListPermissionGroup/${GroupCode}`);
  if (resp.status === 200) {
    dispatch({
      type: type,
      handle: REQUEST,
      payload: resp.data,
    });
  }
  return resp;
};

export const PermissionGroupUpdate = async (GroupCode, data) => {
  let resp = await httpClient.post(
    `Rbac/UpdatePermissionGroup/${GroupCode}`,
    data
  );
  return resp;
};

//Permission Role --------------------------------------------------------
export const PermissionRoleGetItem = async (dispatch, type, GroupCode) => {
  let resp = await httpClient.get(`Rbac/GetListPermissionRole/${GroupCode}`);
  if (resp.status === 200) {
    dispatch({
      type: type,
      handle: REQUEST,
      payload: resp.data,
    });
  }
  return resp;
};

export const PermissionRoleUpdate = async (GroupCode, data) => {
  let resp = await httpClient.post(
    `Rbac/UpdatePermissionRole/${GroupCode}`,
    data
  );
  return resp;
};
