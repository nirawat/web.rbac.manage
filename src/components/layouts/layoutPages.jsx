import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import LayoutAppBar from "./layoutAppBar";
import LayoutMenu from "./layoutMenu";
import {
  CssBaseline,
  Divider,
  Typography,
  Grid,
  Breadcrumbs,
  Link,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import LanguageIcon from "@material-ui/icons/Language";
import Configs from "../../configs";
import { ACTIVE_MENU } from "../../redux/reducers/global.action.type";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  layout: {
    flexGrow: 1,
    width: "100%",
    justifyContent: "center",
    padding: theme.spacing(10, 3, 3, 3),
  },
  iconPage: {
    marginRight: theme.spacing(0.5),
    width: 22,
    height: 22,
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  content: {
    flexGrow: 1,
    width: "100%",
    justifyContent: "center",
    padding: theme.spacing(2, 0, 0, 0),
  },
}));

function getCurrentPage(current_url, func_list) {
  let pageName = "";
  //eslint-disable-next-line
  func_list.map((item) => {
    if (!item.divider) {
      if (item.path === current_url) {
        pageName = item.key;
      } else if (typeof item.path === "undefined" || item.path == null) {
        //eslint-disable-next-line
        item.sub_item.map((sub_item) => {
          if (sub_item.path === current_url) {
            pageName = sub_item.key;
          }
        });
      }
    }
  });
  let paths = current_url.split("/");
  let currPage = paths[paths.length - 1];
  return pageName === "" ? currPage : pageName;
}

function LayoutPages({ routes }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  let location = useLocation();
  const classes = useStyles();
  const currentUrl = location.pathname;
  const accountWebAuth = JSON.parse(
    localStorage.getItem(Configs.config.web_config.web_local_storage)
  );
  const currentPageName = useSelector((state) => state.globalMenu);

  useEffect(
    () => {
      let funcCode = getCurrentPage(currentUrl, accountWebAuth.funcList.func);
      dispatch({
        type: ACTIVE_MENU,
        payload: {
          currentFuncCode: funcCode,
          currentFuncName: t(funcCode),
          menuActive: funcCode,
          menuName: t(funcCode),
          urlRoute: currentUrl,
        },
      });
    }, // eslint-disable-next-line
    [currentUrl]
  );

  const handleBreadcrumbClick = (path) => {
    let funcCode = getCurrentPage(path, accountWebAuth.funcList.func);
    dispatch({
      type: ACTIVE_MENU,
      payload: {
        currentFuncCode: funcCode,
        currentFuncName: t(funcCode),
        urlRoute: path,
      },
    });
    history.push(path);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <LayoutAppBar />
      <LayoutMenu />
      <main className={classes.layout}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography
              gutterBottom
              variant="body1"
              display="block"
              color="textPrimary"
              className={classes.root}
            >
              <LanguageIcon className={classes.iconPage} />
              {currentPageName.currentFuncName}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <Breadcrumbs maxItems={2} aria-label="breadcrumb">
                <Link
                  color="inherit"
                  onClick={(e) => handleBreadcrumbClick("/auth/Dashboard")}
                  className={classes.root}
                >
                  <HomeIcon className={classes.icon} />
                  {t("PageHome")}
                </Link>
                <Link
                  color="inherit"
                  onClick={(e) =>
                    handleBreadcrumbClick(currentPageName.urlRoute)
                  }
                  className={classes.root}
                >
                  {typeof currentPageName.currentFuncName === "undefined"
                    ? ""
                    : currentPageName.currentFuncName}
                </Link>
              </Breadcrumbs>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <main className={classes.content}>
          <Switch>
            {routes.map((route, i) => (
              <Route
                key={i.toString()}
                path={route.path}
                component={route.component}
              />
            ))}
          </Switch>
        </main>
      </main>
    </div>
  );
}

export default LayoutPages;
