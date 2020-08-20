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
  const [ownerInfo, setOwnerInfo] = React.useState(WebConfigs.owner);

  useEffect(
    () => {
      const ownerAuth = JSON.parse(
        localStorage.getItem(WebConfigs.web_config.web_local_storage)
      );
      setOwnerInfo(
        ownerAuth.owner != null ? ownerAuth.owner : WebConfigs.owner
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
        <Content name={"owner_name_thai"} value={ownerInfo.name_thai} />
        <Content name={"owner_name_eng"} value={ownerInfo.name_eng} />
        <Content
          name={"owner_address"}
          value={ownerInfo.address}
          noWrap={true}
        />
        <Content name={"owner_website"} value={ownerInfo.website} />
        <Content name={"owner_email"} value={ownerInfo.email} />
        <Content name={"owner_mobile_phone"} value={ownerInfo.mobile_phone} />
        <Content name={"owner_tel"} value={ownerInfo.tel} />
        <Content name={"owner_contact"} value={ownerInfo.contact} />
        <Content name={"owner_country"} value={ownerInfo.country} />
      </Grid>
    </>
  );
};
