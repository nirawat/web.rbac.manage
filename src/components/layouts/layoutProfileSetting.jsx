import React from "react";
import { useTranslation } from "react-i18next";
import { Grid, ButtonGroup, Button, Switch } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  THEME_LIGHT,
  THEME_DARK,
} from "../../redux/reducers/global.action.type";

export default (theme) => {
  const { t, i18n } = useTranslation();
  const themeMode = useSelector((state) => state.globalSetting.themeMode);
  const dispatch = useDispatch();

  const handleLanguageClick = (eKey) => {
    i18n.changeLanguage(eKey);
  };

  const handleThemeChange = (event) => {
    dispatch({
      type: event.target.checked ? THEME_LIGHT : THEME_DARK,
    });
  };

  return (
    <>
      <Grid container direction="row" justify="center" alignItems="center">
        {/* Language */}
        <Grid item xs={5}>
          {t("std_language")}:
        </Grid>
        <Grid item xs={7}>
          <ButtonGroup variant="text" color="primary" height="25%">
            <Button onClick={() => handleLanguageClick("th")}>ไทย</Button>
            <Button onClick={() => handleLanguageClick("en")}>Eng</Button>
            <Button disabled onClick={() => handleLanguageClick("cn")}>
              中文
            </Button>
          </ButtonGroup>
        </Grid>
        {/* Theme Mode */}
        <Grid item xs={5}>
          {t("std_theme_mode")}:
        </Grid>
        <Grid item xs={7}>
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item style={{ color: "#9e9e9e" }}>
              {t("std_theme_dark")}
            </Grid>
            <Grid item>
              <Switch
                color="primary"
                checked={themeMode === "light" ? true : false}
                onChange={handleThemeChange}
              />
            </Grid>
            <Grid item style={{ color: "#9e9e9e" }}>
              {t("std_theme_light")}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
