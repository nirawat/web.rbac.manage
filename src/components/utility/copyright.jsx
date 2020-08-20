import React from "react";
import Configs from "../../configs";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import Link from "@material-ui/core/Link";

function Copyright() {
  const { t } = useTranslation();
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="/">
        {t(Configs.config.app_name)}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
