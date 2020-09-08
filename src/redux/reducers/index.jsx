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
import { reducerPosition } from "./rbac/rbac.position.reducer";
import { reducerRole } from "./rbac/rbac.role.reducer";
import { reducerDashboard } from "./rbac/rbac.dashboard.reducer";

import { reducerMasterCategory } from "./warehouseRM/master.category.reducer";
import { reducerMasterGroup } from "./warehouseRM/master.group.reducer";
import { reducerMasterWarehouse } from "./warehouseRM/master.warehouse.reducer";
import { reducerMasterLocation } from "./warehouseRM/master.location.reducer";
import { reducerMasterUnit } from "./warehouseRM/master.unit.reducer";
import { reducerMasterItem } from "./warehouseRM/master.item.reducer";
import { reducerMasterItemSku } from "./warehouseRM/master.item.sku.reducer";
import { reducerMasterColor } from "./warehouseRM/master.color.reducer";
import { reducerMasterSize } from "./warehouseRM/master.size.reducer";

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
  reducerPosition: reducerPosition,
  reducerRole: reducerRole,
  reducerDashboard: reducerDashboard,
  reducerMasterCategory: reducerMasterCategory,
  reducerMasterWarehouse: reducerMasterWarehouse,
  reducerMasterLocation: reducerMasterLocation,
  reducerMasterGroup: reducerMasterGroup,
  reducerMasterUnit: reducerMasterUnit,
  reducerMasterItem: reducerMasterItem,
  reducerMasterItemSku: reducerMasterItemSku,
  reducerMasterColor: reducerMasterColor,
  reducerMasterSize: reducerMasterSize,
});

export default reducers;
