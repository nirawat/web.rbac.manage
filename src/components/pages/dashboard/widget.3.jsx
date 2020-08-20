import React, { useState, useEffect } from "react";
//import { useTranslation } from "react-i18next";
// import { useSelector } from "react-redux";
//import PropTypes from "prop-types";
import {
  makeStyles,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardContent,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // "& > *": {
    //   margin: theme.spacing(1),
    // },
    width: "100%",
  },
  cardContent: {
    padding: theme.spacing(1, 2, 1, 2),
  },
}));

const date_options = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
};

function Widget3(props) {
  const classes = useStyles();
  const [timeNow, setTimeNow] = useState(
    new Date().toLocaleDateString("en-GB")
  );
  const [dateNow] = useState(
    new Date().toLocaleDateString("en-GB", date_options)
  );

  useEffect(() => {
    var setTime = setInterval(updateTime, 1000);
    return () => {
      clearInterval(setTime);
    };
  }, []);

  function updateTime() {
    setTimeNow(new Date().toLocaleTimeString("en-GB"));
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent className={classes.cardContent}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12}>
              <Typography variant="h5" gutterBottom color="textSecondary">
                {dateNow}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography variant="h2" gutterBottom color="textSecondary">
                {timeNow}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography
                spacing={0}
                variant="body2"
                gutterBottom
                color="textSecondary"
              >
                {new Date().toTimeString().slice(9)}{" "}
                {Intl.DateTimeFormat().resolvedOptions().timeZone}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Widget3;
