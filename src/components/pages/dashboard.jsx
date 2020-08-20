import React from "react";
//import { palette } from '@material-ui/system';
import { makeStyles, Grid } from "@material-ui/core";
import Widget1 from "./dashboard/widget.1";
import Widget2 from "./dashboard/widget.2";
import Widget3 from "./dashboard/widget.3";
import Widget4 from "./dashboard/widget.4";
import Widget5 from "./dashboard/widget.5";
import Widget6 from "./dashboard/widget.6";
import Widget7 from "./dashboard/widget.7";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <Widget1 title={"จำนวน user"} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Widget3 />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Widget7 />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Widget2 title={"Top Usage"} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Widget6 title={"User Online"} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Widget4 title={"Statistic of Token Request"} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Widget5 title={"Statistic of Usage"} />
        </Grid>
      </Grid>
    </div>
  );
};
