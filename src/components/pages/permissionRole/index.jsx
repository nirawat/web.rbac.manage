import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Grid, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import CardPermissionRole from "./permission.role.card";
import * as globalHandleService from "../../../services/global.handle.service";
import { TYPE_USER_GROUP } from "../../../redux/reducers/global.action.type";

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

const PermissionRole = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoadingData = useSelector(
    (state) => state.globalLoading.isLoadingData
  );
  const skeletonData = useSelector((state) => state.globalLoading.isSkeleton);
  const _data = useSelector((state) => state.reducerUserGroup.data);

  function asyncData() {
    (async () => {
      await globalHandleService.GlobalRequest(dispatch, TYPE_USER_GROUP);
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
    <div className={classes.root}>
      <Grid container spacing={2}>
        {isLoadingData ? (
          skeletonData.map((variant, index) => (
            <Typography
              component="div"
              key={index.toString()}
              variant={variant}
            >
              <Skeleton key={index.toString()} />
            </Typography>
          ))
        ) : (
          <>
            {_data.map((item, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <CardPermissionRole
                  groupCode={item.code}
                  nameThai={item.name_thai}
                  nameEng={item.name_eng}
                  groupLevel={item.group_level}
                  count_role={item.count_role}
                />
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </div>
  );
};

export default PermissionRole;
