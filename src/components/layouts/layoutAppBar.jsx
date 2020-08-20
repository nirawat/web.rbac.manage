import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import Configs from "../../configs";
import {
  Box,
  Toolbar,
  AppBar,
  SwipeableDrawer,
  Typography,
  IconButton,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import LayoutProfile from "./layoutProfile";
import layoutAppBarStyles from "../styles/layoutAppBar.style";
import Notification from "../../components/message/notification";
import MessageAlert from "../../components/message/alert";
import {
  OPEN_AND_CLOSE_MENU,
  MESSAGE_TYPE,
  ALERT_TYPE,
  HIDE_MESSAGE,
} from "../../redux/reducers/global.action.type";

function LayoutAppBar({ routes, params }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classesAppBar = layoutAppBarStyles();
  const [profileInfo, setProfileInfo] = React.useState({
    show: false,
    buttonNavValue: null,
    userProfile: JSON.parse(
      localStorage.getItem(Configs.config.web_config.web_local_storage)
    ),
  });
  const menuShowHide = useSelector((state) => state.globalMenu.menuShow);
  const globalLoading = useSelector((state) => state.globalLoading.isLoading);
  const globalMessage = useSelector((state) => state.globalMessage);

  const hideMessageEvent = (event) => {
    dispatch({ type: HIDE_MESSAGE, payload: null });
  };

  const toggleDrawerProfileInfo = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setProfileInfo({ ...profileInfo, show: open });
  };

  const renderProfileInfo = (
    <SwipeableDrawer
      anchor={"right"}
      open={profileInfo.show}
      onOpen={toggleDrawerProfileInfo(!false)}
      onClose={toggleDrawerProfileInfo(false)}
    >
      <LayoutProfile />
    </SwipeableDrawer>
  );

  const handleDrawerOpen = () => {
    dispatch({
      type: OPEN_AND_CLOSE_MENU,
      payload: {
        menuShow: true,
      },
    });
  };

  return (
    <div className={classesAppBar.root}>
      <AppBar
        position="fixed"
        className={clsx(classesAppBar.appBar, {
          [classesAppBar.appBarShift]: menuShowHide,
        })}
      >
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classesAppBar.menuButton, {
              [classesAppBar.title]: menuShowHide,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {t(Configs.config.app_name)}
          </Typography>
          <div className={classesAppBar.grow} />
          <div className={classesAppBar.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              color="inherit"
              onClick={toggleDrawerProfileInfo(true)}
            >
              <Box
                component="div"
                display="flex"
                justifyContent="center"
                paddingRight={1}
              >
                <Typography>
                  {profileInfo.userProfile != null
                    ? profileInfo.userProfile.fullName
                    : ""}
                </Typography>
              </Box>
              <AccountCircle style={{ fontSize: 35 }} />
            </IconButton>
          </div>
          <div className={classesAppBar.sectionMobile}>
            <IconButton
              aria-label="show more"
              onClick={toggleDrawerProfileInfo(true)}
              color="inherit"
            >
              <AccountCircle style={{ fontSize: 30 }} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderProfileInfo}
      <MessageAlert
        isShow={
          globalMessage.isType === MESSAGE_TYPE ? globalMessage.isShow : false
        }
        isFlag={globalMessage.isFlag}
        isMessage={globalMessage.isMessage}
        onClose={(e) => hideMessageEvent(e)}
      />
      <Notification
        isShow={
          globalMessage.isType === ALERT_TYPE ? globalMessage.isShow : false
        }
        isFlag={globalMessage.isFlag}
        isMessage={globalMessage.isMessage}
        isSysMessage={globalMessage.isSysMessage}
        onClose={(e) => hideMessageEvent(e)}
      />
      <Backdrop className={classesAppBar.backdrop} open={globalLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default LayoutAppBar;
