import Configs from "../configs";

export const isAuthenticatedConfig = () =>
  localStorage.getItem(Configs.config.web_config.web_local_storage);
  
export const isAuthenticated = () =>
  localStorage.getItem(Configs.config.web_config.auth_local_storage);


