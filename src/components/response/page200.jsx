import React from "react";
import Box from "@material-ui/core/Box";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: 40,
    color: green[500],
    margin: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default (props) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div style={{ width: "100%" }}>
      <Box component="div" display="flex" justifyContent="center">
        <CheckCircleIcon className={classes.root} />
      </Box>
      <Box component="div" display="flex" justifyContent="center">
        {t("std_msg_result_200")}
      </Box>
    </div>
  );
};
