import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useWindowDimensions from "../../utility/useWindowsDimensions";
import {
  makeStyles,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Divider,
  Card,
  CardHeader,
  Typography,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import * as globalRBACService from "../../../services/global.rbac.service";
import { TYPE_PERMISSION_GROUP } from "../../../redux/reducers/global.action.type";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: "98%",
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
  },
  buttonTransfer: {
    margin: theme.spacing(0.5, 0),
    width: "98%",
  },
  button: {
    margin: theme.spacing(0.5),
    width: "98%",
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

const ManagePermissionGroup = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { height } = useWindowDimensions();
  const isLoadingData = useSelector(
    (state) => state.globalLoading.isLoadingData
  );
  const skeletonData = useSelector((state) => state.globalLoading.isSkeleton);
  const _permissionGroup = useSelector((state) => state.reducerPermissionGroup);
  const [itemLeft, setItemLeft] = React.useState([]);
  const [itemRight, setItemRight] = React.useState([]);
  const heightScale =
    height <= 414
      ? height - 160
      : height <= 736
      ? height - 180
      : height <= 768
      ? height - 170
      : height - 170;

  function asyncData() {
    (async () => {
      let resp = await globalRBACService.PermissionGroupGetItem(
        dispatch,
        TYPE_PERMISSION_GROUP,
        _permissionGroup.groupCode
      );
      if (resp.status === 200) {
        setItemLeft(resp.data.filter((e) => !e.used));
        setItemRight(resp.data.filter((e) => e.used));
        return resp.data;
      }
    })();
  }

  useEffect(
    () => {
      if (
        typeof _permissionGroup.groupCode === "undefined" ||
        _permissionGroup.groupCode === ""
      ) {
        history.push("/auth/PermissionGroup");
      }
      asyncData();
    }, // eslint-disable-next-line
    [_permissionGroup.groupCode]
  );

  const handleClickSaveEvent = async (e) => {
    e.preventDefault();
    let resp = await globalRBACService.PermissionGroupUpdate(
      _permissionGroup.groupCode,
      itemRight
    );
    if (resp.status === 200) {
      history.push("/auth/PermissionGroup");
    }
  };

  const [checked, setChecked] = React.useState([]);
  const leftChecked = intersection(checked, itemLeft);
  const rightChecked = intersection(checked, itemRight);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setItemRight(itemRight.concat(leftChecked));
    setItemLeft(not(itemLeft, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setItemLeft(itemLeft.concat(rightChecked));
    setItemRight(not(itemRight, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items, heightScale) =>
    isLoadingData ? (
      skeletonData.map((variant, index) => (
        <Typography component="div" key={index.toString()} variant={variant}>
          <Skeleton key={index.toString()} />
        </Typography>
      ))
    ) : (
      <Card style={{ height: heightScale }}>
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Checkbox
              onClick={handleToggleAll(items)}
              checked={
                numberOfChecked(items) === items.length && items.length !== 0
              }
              indeterminate={
                numberOfChecked(items) !== items.length &&
                numberOfChecked(items) !== 0
              }
              disabled={items.length === 0}
              inputProps={{ "aria-label": "all items selected" }}
            />
          }
          title={title}
          subheader={`${numberOfChecked(items)}/${items.length} selected`}
        />
        <Divider />
        <List
          className={classes.list}
          dense
          component="div"
          role="list"
          style={{ height: heightScale - 60 }}
        >
          {items.map((value) => {
            const labelId = `transfer-list-all-item-${value.account_id}-label`;
            return (
              <ListItem
                key={value.account_id}
                role="listitem"
                button
                onClick={handleToggle(value)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    color={"primary"}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={value.account_full_name}
                  secondary={value.account_department}
                />
              </ListItem>
            );
          })}
          <ListItem />
        </List>
      </Card>
    );

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={2}
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item xs={5} sm={5}>
          {customList(t("permission_group_unselected"), itemLeft, heightScale)}
        </Grid>
        <Grid item xs={2} sm={2}>
          <Grid container direction="column" alignItems="center">
            <Button
              variant="outlined"
              size="small"
              className={classes.buttonTransfer}
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.buttonTransfer}
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              className={classes.button}
              onClick={(e) => handleClickSaveEvent(e)}
            >
              {t("global_button_save")}
            </Button>
            <Button
              variant="contained"
              color="default"
              disableElevation
              className={classes.button}
              onClick={(e) => history.push("/auth/PermissionGroup")}
            >
              {t("global_button_close")}
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={5} sm={5}>
          {customList(
            `${t("permission_group_selected")} ${_permissionGroup.groupName}`,
            itemRight,
            heightScale
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default ManagePermissionGroup;
