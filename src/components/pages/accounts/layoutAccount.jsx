import React from "react";
import Configs from "../../../configs";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import SignIn from "./signIn";
import SignUp from "./signUp";
import {
  makeStyles,
  CssBaseline,
  ButtonGroup,
  Button,
  Link,
  Paper,
  Box,
  Grid,
} from "@material-ui/core";
import ForgotPassw from "./forgotPassw";
import Copyright from "../../utility/copyright";
import Notification from "../../message/notification";
import { ALERT_TYPE, HIDE_MESSAGE } from "../../../redux/reducers/global.action.type";

const WebConfigs = Configs.config.web_config;

const layoutSignInStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  logoRoot: {
    flexGrow: 1,
  },
  logo: {
    padding: theme.spacing(0),
    textAlign: "center",
    color: theme.palette.text.primary,
    backgroundColor: "transparent",
  },
  image: {
    backgroundImage: Configs.config.web_config.background_login,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const classes = layoutSignInStyles();
  const [state, setState] = React.useState({
    isMode: "SignIn",
  });
  const globalMessage = useSelector((state) => state.globalMessage);

  function SwitchMode(props) {
    const isMode = props.isMode;
    if (isMode === "SignIn") {
      return <SignIn />;
    }
    if (isMode === "SignUp") {
      return <SignUp />;
    }
    if (isMode === "ForgotPassword") {
      return <ForgotPassw />;
    }
  }

  const handleSignUp = async (e, isMode) => {
    e.preventDefault();
    setState({
      ...state,
      isMode: isMode,
    });
  };

  const handleLanguageClick = (eKey) => {
    i18n.changeLanguage(eKey);
  };

  const hideMessageEvent = (event) => {
    dispatch({ type: HIDE_MESSAGE, payload: null });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={9} className={classes.image} />
      <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <div className={classes.logoRoot}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Paper elevation={0} className={classes.logo}>
                  <img
                    alt="logo_company"
                    style={{ height: 100 }}
                    src={WebConfigs.logo_login}
                  />
                </Paper>
              </Grid>
            </Grid>
          </div>
          <main>
            <SwitchMode isMode={state.isMode} />
            <Grid container>
              <Grid item xs>
                <Link
                  variant="body2"
                  to=""
                  underline="none"
                  onClick={(event) => {
                    handleSignUp(event, "ForgotPassword");
                  }}
                >
                  {t("std_forgot_pass")}
                </Link>
              </Grid>
              <Grid item>
                <Link
                  variant="body2"
                  to=""
                  underline="none"
                  onClick={(event) => {
                    handleSignUp(
                      event,
                      state.isMode === "SignIn" ? "SignUp" : "SignIn"
                    );
                  }}
                >
                  {state.isMode === "SignIn"
                    ? t("std_signUp")
                    : t("std_signIn")}
                </Link>
              </Grid>
            </Grid>
            <Box mt={2} align="center">
              <ButtonGroup variant="text" color="primary">
                <Button onClick={() => handleLanguageClick("th")}>ไทย</Button>
                <Button onClick={() => handleLanguageClick("en")}>Eng</Button>
                <Button disabled onClick={() => handleLanguageClick("cn")}>
                  中文
                </Button>
              </ButtonGroup>
            </Box>
            <Box mt={2} align="center">
              <Copyright />
            </Box>
          </main>
        </div>
        <Notification
          isShow={
            globalMessage.isType === ALERT_TYPE ? globalMessage.isShow : false
          }
          isFlag={globalMessage.isFlag}
          isMessage={globalMessage.isMessage}
          isSysMessage={globalMessage.isSysMessage}
          onClose={(e) => hideMessageEvent(e)}
        />
      </Grid>
    </Grid>
  );
};
