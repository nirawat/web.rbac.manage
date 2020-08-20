import React from "react";
//import { useTranslation } from "react-i18next";
import {
  makeStyles,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Box,
  Divider,
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
    padding: theme.spacing(1),
  },
  infoData: {
    padding: theme.spacing(0),
  },
}));

const InfoData = (props) => {
  return (
    <Typography variant="h2" color="textSecondary">
      <Box align="center" textAlign="center">
        {props.value}
      </Box>
    </Typography>
  );
};

function Widget3(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent className={classes.cardContent}>
          <Grid container spacing={0}>
            <Grid item xs={4} sm={4}>
              <InfoData value={"17"} />
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={4} sm={4}>
              <InfoData value={"12"} />
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={3} sm={3}>
              <InfoData value={"22"} />
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Widget3;
