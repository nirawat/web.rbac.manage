import { httpClient } from "./httpClient";
import { TYPE_DASHBOARD } from "../redux/reducers/global.action.type";
import { GlobalLoadingData } from "./global.function.service";

export const GlobalWidgetData = async (dispatch, handle) => {
  GlobalLoadingData(dispatch, true);
  let resp = await httpClient.get(`Rbac/GetList${handle}`);
  if (resp.status === 200) {
    dispatch({ type: TYPE_DASHBOARD, handle: handle, payload: resp.data });
  }
  GlobalLoadingData(dispatch, false);
  return resp;
};
