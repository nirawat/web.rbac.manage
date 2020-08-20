import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import routes from "./routers";
import { PrivateRoute } from "./routers/private";
import { PublicRoute } from "./routers/public";
import { useDispatch, useSelector } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import {
  THEME_COLOR_DEFAULT,
  THEME_CONTRAST_TEXT,
} from "./redux/reducers/global.action.type";
import Configs from "./configs";
import {
  ACCOUNT_INFO_WRITE_DATA,
  THEME_COLORS,
} from "./redux/reducers/global.action.type";

function App() {
  const dispatch = useDispatch();
  const WebConfigs = Configs.config;
  const localStorages = JSON.parse(
    localStorage.getItem(WebConfigs.web_config.web_local_storage)
  );

  useEffect(
    () => {
      dispatch({
        type: ACCOUNT_INFO_WRITE_DATA,
        payload: {
          account_info: localStorages,
        },
      });
      dispatch({
        type: THEME_COLORS,
        payload: {
          themeColor:
            localStorages !== null ? localStorages.theme : THEME_COLOR_DEFAULT,
        },
      });
    }, // eslint-disable-next-line
    []
  );

  const themeMode = useSelector((state) => state.globalSetting.themeMode);
  const themeColor = useSelector((state) => state.globalSetting.themeColor);
  const theme = createMuiTheme({
    palette: {
      type: themeMode,
      primary: {
        main: themeMode === "light" ? themeColor : themeColor,
        light: themeMode === "light" ? themeColor : themeColor,
        dark: themeMode === "light" ? themeColor : themeColor,
        contrastText: THEME_CONTRAST_TEXT,
      },
    },
  });

  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            {routes.map((route, i) =>
              route.routes ? (
                <PrivateRoute key={i} {...route} />
              ) : (
                <PublicRoute key={i} {...route} />
              )
            )}
          </Switch>
        </Router>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
