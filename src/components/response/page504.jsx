import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button } from "@material-ui/core";

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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const handleSubmit = async (e) => {
    //e.preventDefault();
  };

  return (
    <div className={classes.root}>
      <Box className={classes.box}>
        <h1>504</h1>
      </Box>
      <Box className={classes.box}>{t("std_msg_result_504")}</Box>
      <Box className={classes.box}>
        <Button
          type="button"
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={(event) => {
            handleSubmit(event);
          }}
        >
          {t("global_button_tryAgain")}
        </Button>
      </Box>
    </div>
  );
};
