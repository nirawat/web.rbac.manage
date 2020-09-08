import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import Configs from "../../configs";
import { useTheme } from "@material-ui/core/styles";
import {
  makeStyles,
  Drawer,
  SwipeableDrawer,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Grid,
  Icon,
  Box,
} from "@material-ui/core";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import {
  OPEN_AND_CLOSE_MENU,
  ACTIVE_MENU,
} from "../../redux/reducers/global.action.type";

const WebConfigs = Configs.config;

const drawerWidth = 300;

const layoutMenuStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(3),
  },
  title: {
    display: "none",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(0) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(0) + 1,
    },
  },
}));

const logoStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  box: {
    zIndex: -1,
  },
  layout: {
    padding: theme.spacing(0),
    textAlign: "center",
    alignContent: "center",
    height: 110,
    color: theme.palette.text.secondary,
    backgroundColor: "transparent",
  },
  content: {
    flexGrow: 1,
    width: "100%",
    justifyContent: "center",
    padding: theme.spacing(2, 0, 0, 0),
  },
}));

const getLink = (link) =>
  typeof link != "undefined" && link != null ? link : window.location.pathname;

function LayoutMenu() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const classesLogo = logoStyles();
  const classesDrawer = layoutMenuStyles();
  const theme = useTheme();
  const [funcAuth, setFuncAuth] = useState(WebConfigs.func);

  useEffect(
    () => {
      const menuAccountAuth = JSON.parse(
        localStorage.getItem(WebConfigs.web_config.web_local_storage)
      );
      if (menuAccountAuth === null) {
        localStorage.removeItem(Configs.config.web_config.auth_local_storage);
        history.push("/");
      }
      setFuncAuth(
        menuAccountAuth != null
          ? menuAccountAuth.funcList.func
          : WebConfigs.func
      );
    }, // eslint-disable-next-line
    []
  );

  const menuShowHide = useSelector((state) => state.globalMenu.menuShow);
  const handleDrawerClose = () => {
    dispatch({
      type: OPEN_AND_CLOSE_MENU,
      payload: {
        menuShow: false,
      },
    });
  };

  const menuActive = useSelector((state) => state.globalMenu.menuActive);
  const handleMenuClick = (key, path) => {
    dispatch({
      type: ACTIVE_MENU,
      payload: {
        menuActive: menuActive === key ? null : key,
        menuName: t(key),
      },
    });
    if (path != null) handleDrawerClose();
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    handleDrawerClose();
  };

  return (
    <div className={classesDrawer.root}>
      <React.Fragment key={"left"}>
        <SwipeableDrawer
          anchor={"left"}
          open={menuShowHide}
          onOpen={toggleDrawer("left", !menuShowHide)}
          onClose={toggleDrawer("left", menuShowHide)}
        >
          <Drawer
            variant="permanent"
            className={clsx(classesDrawer.drawer, {
              [classesDrawer.drawerOpen]: menuShowHide,
              [classesDrawer.drawerClose]: !menuShowHide,
            })}
            classes={{
              paper: clsx({
                [classesDrawer.drawerOpen]: menuShowHide,
                [classesDrawer.drawerClose]: !menuShowHide,
              }),
            }}
          >
            {/* boxShadow={3} */}
            <Box className={classesLogo.box}>
              <div className={classesDrawer.toolbar}>
                <div className={classesLogo.root}>
                  <Grid container spacing={0} className={classesLogo.layout}>
                    <Grid item xs={12}>
                      <img
                        alt="logo_company"
                        style={{ height: 45 }}
                        src={WebConfigs.web_config.logo_layout}
                      />
                    </Grid>
                  </Grid>
                </div>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "rtl" ? (
                    <ChevronRightIcon />
                  ) : (
                    <ChevronLeftIcon />
                  )}
                </IconButton>
              </div>
            </Box>
            {/* <Box
              style={{
                height: 1,
                backgroundColor: theme.palette.primary.main,
              }}
            /> */}
            <Divider />
            <List dense={false}>
              {funcAuth.map((item, index) => {
                switch (item.divider) {
                  case true:
                    return <Divider key={index} />;
                  default:
                    return (
                      <div key={index}>
                        <ListItem
                          button
                          key={item.key}
                          onClick={() => handleMenuClick(item.key, item.path)}
                          component={Link}
                          to={getLink(item.path)}
                        >
                          <ListItemIcon margin={0} padding={0}>
                            <Icon style={{ color: theme.palette.primary.main }}>
                              {item.icon}
                            </Icon>
                          </ListItemIcon>
                          <ListItemText primary={t(item.key)} />
                          {item.sub_item && item.sub_item.length > 0 ? (
                            menuActive === item.key ? (
                              <ExpandMoreIcon />
                            ) : (
                              <NavigateNextIcon />
                            )
                          ) : (
                            <></>
                          )}
                        </ListItem>
                        {item.sub_item && item.sub_item.length > 0 ? (
                          <Collapse
                            in={menuActive === item.key ? true : false}
                            timeout="auto"
                            unmountOnExit
                          >
                            <List dense={false} component="div" disablePadding>
                              {item.sub_item.map((sub_item) => (
                                <ListItem
                                  button
                                  key={sub_item.key}
                                  className={classesDrawer.nested}
                                  component={Link}
                                  onClick={handleDrawerClose}
                                  to={getLink(sub_item.path)}
                                >
                                  <ListItemIcon>
                                    <Icon>{sub_item.icon}</Icon>
                                  </ListItemIcon>
                                  <ListItemText primary={t(sub_item.key)} />
                                </ListItem>
                              ))}
                            </List>
                          </Collapse>
                        ) : (
                          <></>
                        )}
                      </div>
                    );
                }
              })}
            </List>
          </Drawer>
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}

export default LayoutMenu;
