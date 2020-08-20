import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
//import { useTranslation } from "react-i18next";
//import PropTypes from "prop-types";
import {
  makeStyles,
  Card,
  CardMedia,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  Grid,
} from "@material-ui/core";
import { Doughnut } from "react-chartjs-2";
import * as dashboardService from "../../../services/dashboard.service";
import { DASHBOARD_WIDGET_1 } from "../../../redux/reducers/global.action.type.jsx";

//ChartJs Data Sample

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: 300,
  },
  cardContent: {
    padding: theme.spacing(1, 2, 5, 2),
  },
  cardAction: {
    minHeight: 30,
  },
  content: {
    whiteSpace: "nowrap",
  },
  divCardContent: {
    margin: theme.spacing(0),
  },
}));

const CardContents1 = (prop) => {
  const classes = useStyles();
  return (
    <div className={classes.divCardContent}>
      <Typography
        gutterBottom
        variant="h3"
        align="center"
        color="textSecondary"
      >
        {prop.value}
      </Typography>
    </div>
  );
};

function Widget1(props) {
  //const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [chartData, setChartData] = useState({
    labels: ["Online", "Offline"],
    //borderWidth: 0,
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ["#29a329", "#e0e0e0"],
        hoverBackgroundColor: ["#29a329", "#e0e0e0"],
      },
    ],
  });
  const [chartOption] = useState({
    responsive: true,
    rotation: 1 * Math.PI,
    circumference: 1 * Math.PI,
  });
  const [_data, setData] = useState({
    online_count: 0,
    online_percent: "0%",
    offline_count: 0,
    offline_percent: "0%",
  });

  function asyncData() {
    (async () => {
      let resp = await dashboardService.GlobalWidgetData(
        dispatch,
        DASHBOARD_WIDGET_1
      );
      if (resp.status === 200) {
        let _usage = resp.data[0];
        setData({
          ..._data,
          online_count: _usage.online_count,
          online_percent: _usage.online_percent,
          offline_count: _usage.offline_count,
          offline_percent: _usage.offline_percent,
        });
        setChartData({
          ...chartData,
          datasets: [
            {
              data: [_usage.online_count, _usage.offline_count],
            },
          ],
        });
      }
    })();
  }

  useEffect(
    () => {
      asyncData();
    },
    // eslint-disable-next-line
    []
  );

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia>
          <Doughnut data={chartData} options={chartOption} />
        </CardMedia>
        <CardContent className={classes.cardContent}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
              <CardContents1 value={_data.online_percent} />
            </Grid>
            <Grid item xs={6} sm={6}>
              <CardContents1 value={_data.offline_percent} />
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
      {/* <Divider /> */}
      <CardActions className={classes.cardAction}></CardActions>
    </Card>
  );
}

export default Widget1;
