import { httpClient } from "./httpClient";
import Configs from "../configs";
import { ACCOUNT_INFO_CLEAR_DATA } from "../redux/reducers/global.action.type";
import {
  GlobalMessageShow,
  GlobalLoadingEvent,
} from "./global.function.service";

export const SignInService = async (userInfo) => {
  let resp = await httpClient.post("Auth/SignIn", userInfo);
  if (!!resp && resp.status === 200 && !!resp.token) {
    localStorage.setItem(
      Configs.config.web_config.auth_local_storage,
      JSON.stringify(resp.token)
    );
    localStorage.setItem(
      Configs.config.web_config.web_local_storage,
      JSON.stringify(resp.userInfo)
    );
  }
  return resp;
};

export const SignOutService = async (dispatch, userInfo) => {
  let resp = await httpClient.post("Auth/SignOut", userInfo);
  if (!!resp && resp.status === 200) {
    localStorage.removeItem(Configs.config.web_config.auth_local_storage);
    localStorage.removeItem(Configs.config.web_config.web_local_storage);
    dispatch({
      type: ACCOUNT_INFO_CLEAR_DATA,
      payload: {
        account_info: "",
      },
    });
  }
  return resp;
};

export const ChangePasswordService = async (dispatch, info) => {
  GlobalLoadingEvent(dispatch, true);
  let resp = await httpClient.post("Auth/ChangePassword", info);
  GlobalLoadingEvent(dispatch, false);
  GlobalMessageShow(dispatch, resp);
  return resp;
};

export const SignUpService = async (account) => {
  let resp = await httpClient.post("Account/SignUp", account);
  return resp;
};

export const ForgotPasswordService = async (email) => {
  let resp = await httpClient.post("Account/ForgotPassword", email);
  return resp;
};
