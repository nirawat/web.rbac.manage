import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const ConfirmDialog = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();

  let dialog = (
    <div className={classes.root}>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        open={true}
      >
        <DialogTitle id="alert-dialog-title">{props.isTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.isMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onOk} color="primary" autoFocus>
            {t("global_button_ok")}
          </Button>
          <Button onClick={props.onClose} color="primary">
            {t("global_button_close")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  if (!props.isShow) {
    dialog = null;
  }
  return <div> {dialog}</div>;
};

export default ConfirmDialog;
