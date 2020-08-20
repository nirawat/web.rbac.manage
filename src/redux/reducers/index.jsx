import { combineReducers } from "redux";
import { globalSetting } from "./global.setting.reducer";
import { globalMenu } from "./global.menu.reducer";
import { globalLoading } from "./global.loading.reducer";
import { globalMessage } from "./global.message.reducer";
import { globalAccount } from "./global.account.reducer";
import { reducerTokenKey } from "./rbac/rbac.token.key.reducer";
import { reducerUserGroup } from "./rbac/rbac.user.group.reducer";
import { reducerUser } from "./rbac/rbac.user.reducer";
import { reducerFuncMenu } from "./rbac/rbac.function.menu.reducer";
import { reducerPermissionGroup } from "./rbac/rbac.permission.group.reducer";
import { reducerPermissionRole } from "./rbac/rbac.permission.role.reducer";
import { reducerPermissionFunc } from "./rbac/rbac.permission.func.reducer";
import { reducerRegister } from "./rbac/rbac.register.reducer";
import { reducerSection } from "./rbac/rbac.section.reducer";
import { reducerRole } from "./rbac/rbac.role.reducer";
import { reducerDashboard } from "./rbac/rbac.dashboard.reducer";

const reducers = combineReducers({
  globalSetting: globalSetting,
  globalMenu: globalMenu,
  globalLoading: globalLoading,
  globalMessage: globalMessage,
  globalAccount: globalAccount,
  reducerTokenKey: reducerTokenKey,
  reducerUserGroup: reducerUserGroup,
  reducerUser: reducerUser,
  reducerFuncMenu: reducerFuncMenu,
  reducerPermissionGroup: reducerPermissionGroup,
  reducerPermissionRole: reducerPermissionRole,
  reducerPermissionFunc: reducerPermissionFunc,
  reducerRegister: reducerRegister,
  reducerSection: reducerSection,
  reducerRole: reducerRole,
  reducerDashboard: reducerDashboard,
});

export default reducers;
