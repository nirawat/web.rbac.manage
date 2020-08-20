import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import PropTypes from "prop-types";
import {
  makeStyles,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Divider,
} from "@material-ui/core";
import { Chart } from "react-google-charts";
import * as dashboardService from "../../../services/dashboard.service";
import { DASHBOARD_WIDGET_4 } from "../../../redux/reducers/global.action.type.jsx";

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // "& > *": {
    //   margin: theme.spacing(1),
    // },
    width: "100%",
  },
  cardTitle: {
    padding: theme.spacing(1, 0, 0, 2),
  },
  cardContent: {
    padding: theme.spacing(1),
  },
}));

function Widget4(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { title } = props;
  const skeletonData = useSelector((state) => state.globalLoading.isSkeleton);
  const [_list, setList] = useState();

  function asyncData() {
    (async () => {
      let resp = await dashboardService.GlobalWidgetData(
        dispatch,
        DASHBOARD_WIDGET_4
      );
      if (resp.status === 200) {
        let _array = [];
        _array.push(["", "Request"]);
        resp.data.map((item, index) =>
          _array.push([item.event_time, item.event_time_count])
        );
        setList(_array);
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
        <Typography
          variant="subtitle2"
          gutterBottom
          className={classes.cardTitle}
        >
          {title}
        </Typography>
        <Divider />
        <CardContent className={classes.cardContent}>
          <Chart
            width={"99.5%"}
            height={280}
            chartType="Line"
            loader={skeletonData.map((variant, index) => (
              <Typography
                component="div"
                key={index.toString()}
                variant={variant}
              >
                <Skeleton key={index.toString()} />
              </Typography>
            ))}
            data={_list}
            options={{
              legend: "none",
              chartArea: { width: "50%", height: "70%" },
              series: {
                0: { color: "#2196f3" },
              },
              axes: {
                y: {
                  all: {
                    range: {
                      max: 55,
                      min: 0,
                    },
                  },
                },
              },
            }}
            rootProps={{ "data-testid": "1" }}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

Widget4.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Widget4;
