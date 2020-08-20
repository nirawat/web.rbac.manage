import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Grid, Typography, IconButton } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import CardUserGroup from "./user.group.card";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import * as globalHandleService from "../../../services/global.handle.service";
import {
  TYPE_USER_GROUP,
  HANDLE_MODE,
  NEW,
} from "../../../redux/reducers/global.action.type";

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

const UserGroup = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
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

  const handleClickNew = (e, isMode) => {
    e.preventDefault();
    dispatch({
      type: TYPE_USER_GROUP,
      handle: HANDLE_MODE,
      payload: {
        isMode: isMode,
      },
    });
    history.push("/auth/ManageUserGroup");
  };

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
                <CardUserGroup
                  groupCode={item.code}
                  nameThai={item.name_thai}
                  nameEng={item.name_eng}
                  groupLevel={item.group_level}
                  themeCode={item.theme_code}
                  count_member={item.count_member}
                  count_role={item.count_role}
                />
              </Grid>
            ))}
            <Grid item xs={12} sm={4}>
              <IconButton
                aria-label="add"
                color="primary"
                onClick={(e) => handleClickNew(e, NEW)}
              >
                <AddCircleIcon fontSize="large" />
              </IconButton>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};

export default UserGroup;
