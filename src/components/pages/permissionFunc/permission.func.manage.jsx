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
import { TYPE_PERMISSION_FUNC } from "../../../redux/reducers/global.action.type";

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

const ManagePermissionFunc = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { height } = useWindowDimensions();
  const isLoadingData = useSelector(
    (state) => state.globalLoading.isLoadingData
  );
  const skeletonData = useSelector((state) => state.globalLoading.isSkeleton);
  const _permissionFunc = useSelector((state) => state.reducerPermissionFunc);
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
      let resp = await globalRBACService.PermissionFuncGetItem(
        dispatch,
        TYPE_PERMISSION_FUNC,
        _permissionFunc.groupCode
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
        typeof _permissionFunc.groupCode === "undefined" ||
        _permissionFunc.groupCode === ""
      ) {
        history.push("/auth/PermissionFunc");
      }
      asyncData();
    }, // eslint-disable-next-line
    [_permissionFunc.groupCode]
  );

  const handleClickSaveEvent = async (e) => {
    e.preventDefault();
    let resp = await globalRBACService.PermissionFuncUpdate(
      _permissionFunc.groupCode,
      itemRight
    );
    if (resp.status === 200) {
      history.push("/auth/PermissionFunc");
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

  const handleAddDivider = () => {
    // setItemRight(itemRight.concat(leftChecked));
    // setItemLeft(not(itemLeft, leftChecked));
    // setChecked(not(checked, leftChecked));
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
          {items.map((value, index) => {
            const labelId = `transfer-list-all-item-${value.func_code}-label`;
            return (
              <ListItem
                key={index}
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
                  primary={value.func_name}
                  secondary={`${value.func_type} ${
                    value.func_ref_sub !== "" ? " - " + value.func_ref_sub : ""
                  }`}
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
          {customList(t("permission_func_unselected"), itemLeft, heightScale)}
        </Grid>
        <Grid item xs={2} sm={2}>
          <Grid container direction="column" alignItems="center">
            <Button
              variant="outlined"
              size="small"
              className={classes.buttonTransfer}
              onClick={handleAddDivider}
              aria-label="move selected divider"
            >
              {t("global_button_divider")}
            </Button>
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
              onClick={(e) => history.push("/auth/PermissionFunc")}
            >
              {t("global_button_close")}
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={5} sm={5}>
          {customList(
            `${t("permission_func_selected")} ${_permissionFunc.groupName}`,
            itemRight,
            heightScale
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default ManagePermissionFunc;
