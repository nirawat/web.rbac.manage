import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Blue from "@material-ui/core/colors/blue";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "100%",
    },
  },
  box: {
    component: "div",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
  },
  button: {
    color: theme.palette.getContrastText(Blue[500]),
    backgroundColor: Blue[500],
    "&:hover": {
      backgroundColor: Blue[700],
    },
    margin: theme.spacing(3),
  },
}));

export default () => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Box className={classes.box}>
        <h1>500</h1>
      </Box>
      <Box className={classes.box}>
      {t('std_msg_result_500')}
      </Box>
    </div>
  );
};
