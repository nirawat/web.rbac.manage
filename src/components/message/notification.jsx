import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles, Snackbar } from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  divider: {
    color: "transparent",
    marginBottom: theme.spacing(1),
  },
}));

const Notification = (props) => {
  const classes = useStyles();
  const [anchor] = React.useState({
    vertical: "bottom",
    horizontal: "center",
  });
  const { vertical, horizontal } = anchor;

  let alert = (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={"topCenter"}
        open={true}
        autoHideDuration={6000}
        onClose={props.onClose}
      >
        <Alert onClose={props.onClose} severity={props.isFlag}>
          {props.isFlag.toUpperCase()} <br />
          {props.isMessage} <br />
          {props.isFlag === "success" ? "" : props.isSysMessage}
        </Alert>
      </Snackbar>
    </div>
  );

  if (!props.isShow) {
    alert = null;
  }
  return <>{alert}</>;
};

export default Notification;
