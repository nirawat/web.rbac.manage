import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { SignInService } from "../../../services/auth.service";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Button, TextField } from "@material-ui/core";
import useStyles from "../../styles/signIn.style";
import {
  ACCOUNT_INFO_WRITE_DATA,
  THEME_COLORS,
} from "../../../redux/reducers/global.action.type";
import { GlobalMessageShow } from "../../../services/global.function.service";

export default () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [userInfo, setUserInfo] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let resp = await SignInService(userInfo);
    if (resp.status === 200) {
      dispatch({
        type: ACCOUNT_INFO_WRITE_DATA,
        payload: {
          account_info: resp.userInfo,
        },
      });
      dispatch({
        type: THEME_COLORS,
        payload: {
          themeColor: resp.userInfo.theme,
        },
      });
      history.push("/auth/Dashboard");
    } else {
      GlobalMessageShow(dispatch, resp);
    }
  };

  return (
    <>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label={t("std_email")}
          name="email"
          autoComplete="email"
          autoFocus
          onChange={(e) => {
            setUserInfo({
              ...userInfo,
              email: e.target.value,
            });
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label={t("std_pass")}
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => {
            setUserInfo({
              ...userInfo,
              passWord: e.target.value,
            });
          }}
        />
        {/* <FormControlLabel
          control={
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              value="remember"
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  remember: e.target.checked,
                });
              }}
            />
          }
          label={t("std_remember_login")}
        /> */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {t("std_signIn")}
        </Button>
      </form>
    </>
  );
};
