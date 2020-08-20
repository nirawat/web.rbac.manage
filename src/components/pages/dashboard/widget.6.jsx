import React, { useEffect } from "react";
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
import { DASHBOARD_WIDGET_6 } from "../../../redux/reducers/global.action.type.jsx";

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

function Widget6(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { title } = props;
  const skeletonData = useSelector((state) => state.globalLoading.isSkeleton);
  const [_list, setList] = React.useState();

  function asyncData() {
    (async () => {
      let resp = await dashboardService.GlobalWidgetData(
        dispatch,
        DASHBOARD_WIDGET_6
      );
      if (resp.status === 200) {
        let _array = [];
        _array.push(["Country", "Usage"]);
        resp.data.map((item, index) =>
          _array.push([item.country, parseInt(item.usage_count)])
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
            width={"100%"}
            height={"250px"}
            chartType="GeoChart"
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
              backgroundColor: "transparent",
            }}
            // Note: you will need to get a mapsApiKey for your project.
            // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
            mapsApiKey="YOUR_KEY_HERE"
            rootProps={{ "data-testid": "99" }}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

Widget6.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Widget6;
