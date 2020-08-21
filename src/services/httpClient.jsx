import axios from "axios";
import Configs from "../configs";

axios.create();

axios.interceptors.request.use(
  (config) => {
    const jwtToken = localStorage.getItem(
      Configs.config.web_config.auth_local_storage
    );
    if (jwtToken != null) {
      config.headers = {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${jwtToken.replace('"', "").replace('"', "")}`,
      };
    }
    config.timeout = 1000;
    config.baseURL = Configs.config.web_config.core_base_url;
    return config;
  }
);

axios.interceptors.response.use(
  (resp) => {
    return resp.data.resp;
  },
  (error) => {
    try {
      const originalRequest = error.config;
      const {
        response: { status },
      } = error;
      if (status === 401 && !originalRequest._retry) {
        const localStorages = JSON.parse(
          localStorage.getItem(Configs.config.web_config.web_local_storage)
        );
        return axios
          .get(`Auth/RefreshToken/${localStorages.accountId}`)
          .then((resp) => {
            if (typeof resp.token !== "undefined" && resp.token !== "") {
              localStorage.setItem(
                Configs.config.web_config.auth_local_storage,
                JSON.stringify(resp.token)
              );
              return axios(originalRequest);
            }
          });
      }
    } catch (e) {
      if (String(error).includes("timeout of 1000ms") === true) {
        return { status: 0, message: "The Server connection time out." };
      } else {
        return { status: 0, message: "The Server connection fail." };
      }
    }
    return Promise.reject(error);
  }
);

export const httpClient = axios;
