//Public Page
import Home from "../components/pages/home";
import LayoutAccount from "../components/pages/accounts/layoutAccount";
import LayoutPages from "../components/layouts/layoutPages";

//Response Page
import Page200 from "../components/response/page200";
import Page404 from "../components/response/page404";
import Page504 from "../components/response/page504";
import Page500 from "../components/response/page500";

//Business Page
import Dashboard from "../components/pages/dashboard";
import User from "../components/pages/user/index";
import FunctionMenu from "../components/pages/functionMenu/index";
import MasterRole from "../components/pages/masterRole/index";
import MasterSection from "../components/pages/masterSection/index";
import TokenKey from "../components/pages/tokenKey/index";
import ManageTokenKey from "../components/pages/tokenKey/token.manage";
import UserGroup from "../components/pages/userGroup/index";
import ManageUserGroup from "../components/pages/userGroup/user.group.manage";
import PermissionGroup from "../components/pages/permissionGroup/index";
import ManagePermissionGroup from "../components/pages/permissionGroup/permission.group.manage";
import PermissionRole from "../components/pages/permissionRole/index";
import ManagePermissionRole from "../components/pages/permissionRole/permission.role.manage";
import PermissionFunc from "../components/pages/permissionFunc/index";
import ManagePermissionFunc from "../components/pages/permissionFunc/permission.func.manage";
import Register from "../components/pages/register/index";
import ManageRegister from "../components/pages/register/register.manage";
import ActiveRegister from "../components/pages/register/register.active";

const routes = [
  {
    path: "/",
    component: LayoutAccount,
    exact: true,
  },
  {
    path: "/Home",
    component: Home,
    exact: true,
  },
  {
    path: "/auth",
    component: LayoutPages,
    routes: [
      {
        path: "/auth/Dashboard",
        component: Dashboard,
      },
      {
        path: "/auth/page200",
        component: Page200,
      },
      {
        path: "/auth/page404",
        component: Page404,
      },
      {
        path: "/auth/page504",
        component: Page504,
      },
      {
        path: "/auth/page500",
        component: Page500,
      },
      {
        path: "/auth/TokenKey",
        component: TokenKey,
      },
      {
        path: "/auth/ManageTokenKey",
        component: ManageTokenKey,
      },
      {
        path: "/auth/UserGroup",
        component: UserGroup,
      },
      {
        path: "/auth/ManageUserGroup",
        component: ManageUserGroup,
      },
      {
        path: "/auth/User",
        component: User,
      },
      {
        path: "/auth/FunctionMenu",
        component: FunctionMenu,
      },
      {
        path: "/auth/PermissionGroup",
        component: PermissionGroup,
      },
      {
        path: "/auth/ManagePermissionGroup",
        component: ManagePermissionGroup,
      },
      {
        path: "/auth/PermissionRole",
        component: PermissionRole,
      },
      {
        path: "/auth/ManagePermissionRole",
        component: ManagePermissionRole,
      },
      {
        path: "/auth/PermissionFunc",
        component: PermissionFunc,
      },
      {
        path: "/auth/ManagePermissionFunc",
        component: ManagePermissionFunc,
      },
      {
        path: "/auth/Register",
        component: Register,
      },
      {
        path: "/auth/ManageRegister",
        component: ManageRegister,
      },
      {
        path: "/auth/ActiveRegister",
        component: ActiveRegister,
      },
      {
        path: "/auth/MasterRole",
        component: MasterRole,
      },
      {
        path: "/auth/MasterSection",
        component: MasterSection,
      },
    ],
  },
];
export default routes;
