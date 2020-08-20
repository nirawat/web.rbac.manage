import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core";
import { Grid, Typography } from "@material-ui/core";
import Configs from "../../configs";

const WebConfigs = Configs.config;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    paddingTop: theme.spacing(1),
  },
}));
export default (theme) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [registerInfo, setRegisterInfo] = React.useState(WebConfigs.register);

  useEffect(
    () => {
      const registerAuth = JSON.parse(
        localStorage.getItem(WebConfigs.web_config.web_local_storage)
      );
      setRegisterInfo(
        registerAuth.register != null
          ? registerAuth.register
          : WebConfigs.register
      );
    }, // eslint-disable-next-line
    []
  );

  const Content = (props) => {
    return (
      <>
        <Grid item xs={4} className={classes.content}>
          {t(props.name)}:
        </Grid>
        <Grid item xs={8} className={classes.content}>
          <Typography variant="body2" noWrap={!props.noWrap}>
            {props.value}
          </Typography>
        </Grid>
      </>
    );
  };

  return (
    <>
      <Grid container direction="row" justify="center" alignItems="center">
        <Content name={"register_sys_id"} value={registerInfo.system_id} />
        <Content name={"register_name_thai"} value={registerInfo.name_thai} />
        <Content name={"register_name_eng"} value={registerInfo.name_eng} />
        <Content
          name={"register_address"}
          value={registerInfo.address}
          noWrap={true}
        />
        <Content name={"register_website"} value={registerInfo.website} />
        <Content name={"register_email"} value={registerInfo.email} />
        <Content name={"register_tel"} value={registerInfo.tel} />
        <Content name={"register_fax"} value={registerInfo.fax} />
        <Content name={"register_contract"} value={registerInfo.contract} />
        <Content name={"register_country"} value={registerInfo.country} />
        <Content
          name={"register_activate_date"}
          value={
            registerInfo.register_date === "1999-01-01T00:00:00"
              ? ""
              : new Date(registerInfo.register_date).toLocaleDateString("en-GB")
          }
        />
        <Content
          name={"register_expire_date"}
          value={
            registerInfo.expire_date === "1999-01-01T00:00:00"
              ? ""
              : new Date(registerInfo.expire_date).toLocaleDateString("en-GB")
          }
        />
      </Grid>
    </>
  );
};
