import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  makeStyles,
  Grid,
  Button,
  TextField,
  Slider,
  Typography,
  Avatar,
} from "@material-ui/core";
import * as globalHandleService from "../../../services/global.handle.service";
import ConfirmDialog from "../../message/confirmDialog";
import CheckIcon from "@material-ui/icons/Check";
import {
  TYPE_USER_GROUP,
  NEW,
  EDIT,
  REMOVE,
  THEME_COLOR_BLUE,
  THEME_COLOR_BLUE_GRAY,
  THEME_COLOR_GREEN,
  THEME_COLOR_AMBER,
  THEME_COLOR_ORANG,
  THEME_COLOR_RED,
  THEME_COLOR_PURPLE,
  THEME_COLOR_DEEP_PURPLE,
  THEME_COLOR_BLACK_GRAY,
  THEME_COLOR_CYAN,
  THEME_COLOR_TEAL,
  THEME_COLOR_LIGHT_GREEN,
  THEME_COLOR_PINK,
  THEME_COLOR_GRAY,
} from "../../../redux/reducers/global.action.type";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  textField: {
    flexGrow: 1,
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "98%",
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  sliderLabel: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  slider: {
    marginLeft: theme.spacing(1),
    width: "98%",
    height: theme.spacing(1),
  },
}));

const sliderMarks = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 10,
    label: "10",
  },
];

function sliderValueText(value) {
  return `${value}`;
}

const ManageUserGroup = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = React.useState(false);
  const initialData = useSelector((state) => state.reducerUserGroup.model);
  const isMode = useSelector((state) => state.reducerUserGroup.isMode);
  const [_model, setModel] = React.useState(initialData);

  useEffect(() => {
    setModel(
      isMode === NEW
        ? {
            code: "",
            name_thai: "",
            name_eng: "",
            theme_code: "",
            group_level: 0,
          }
        : initialData
    );
  }, [isMode, initialData]);

  const handleClickSaveEvent = async (e) => {
    e.preventDefault();
    if (isMode === REMOVE) {
      setIsOpenConfirmDialog(true);
    } else {
      let resp;
      switch (isMode) {
        case NEW:
          resp = await globalHandleService.GlobalInsert(
            dispatch,
            TYPE_USER_GROUP,
            _model
          );
          break;
        case EDIT:
          resp = await globalHandleService.GlobalUpdate(
            dispatch,
            TYPE_USER_GROUP,
            _model
          );
          break;
        default:
          break;
      }
      if (resp.status === 200) {
        history.push("/auth/UserGroup");
      }
    }
  };

  const handleClickDeleteConfirmEvent = async (e) => {
    e.preventDefault();
    setIsOpenConfirmDialog(false);
    let resp = await globalHandleService.GlobalDelete(
      dispatch,
      TYPE_USER_GROUP,
      _model
    );
    if (resp.status === 200) {
      history.push("/auth/UserGroup");
    }
  };

  const handleSliderChange = (e, newValue) => {
    setModel({ ..._model, group_level: Number(newValue) });
  };

  const ThemeColors = (props) => (
    <Avatar
      name={props.defaultThemeColor}
      style={{
        margin: 5,
        width: 35,
        height: 35,
        color:
          props.defaultThemeColor === _model.theme_code
            ? "#f5f5f5"
            : props.defaultThemeColor,
        backgroundColor: props.defaultThemeColor,
      }}
      onClick={(e) => {
        setModel({ ..._model, theme_code: props.defaultThemeColor });
      }}
    >
      <CheckIcon />
    </Avatar>
  );

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <form className={classes.textField} noValidate autoComplete="off">
          <Grid item xs={12} sm={12}>
            <TextField
              disabled={isMode === NEW ? false : true}
              label={t("user_group_code")}
              id="user_group_code"
              required={true}
              value={_model.code}
              autoFocus={isMode === NEW ? true : false}
              onChange={(e) => setModel({ ..._model, code: e.target.value })}
              inputProps={{ maxLength: 4 }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              disabled={isMode === REMOVE ? true : false}
              label={t("user_group_name_thai")}
              id="user_group_name_thai"
              required={true}
              value={_model.name_thai}
              autoFocus={isMode === EDIT ? true : false}
              onChange={(e) =>
                setModel({ ..._model, name_thai: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              disabled={isMode === REMOVE ? true : false}
              label={t("user_group_name_eng")}
              id="user_group_name_eng"
              required={true}
              value={_model.name_eng}
              onChange={(e) =>
                setModel({ ..._model, name_eng: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography
              id="discrete-slider-always"
              color={"textSecondary"}
              className={classes.sliderLabel}
              gutterBottom
            >
              {t("user_group_level")}
            </Typography>
            <Slider
              className={classes.slider}
              disabled={isMode === REMOVE ? true : false}
              defaultValue={_model.group_level}
              value={_model.group_level}
              getAriaValueText={sliderValueText}
              aria-labelledby="discrete-slider-always"
              step={1}
              min={1}
              max={10}
              marks={sliderMarks}
              valueLabelDisplay="on"
              onChange={handleSliderChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Grid
              component="label"
              container
              alignItems="flex-start"
              spacing={1}
            >
              <ThemeColors defaultThemeColor={THEME_COLOR_BLACK_GRAY} />
              <ThemeColors defaultThemeColor={THEME_COLOR_BLUE} />
              <ThemeColors defaultThemeColor={THEME_COLOR_DEEP_PURPLE} />
              <ThemeColors defaultThemeColor={THEME_COLOR_PURPLE} />
              <ThemeColors defaultThemeColor={THEME_COLOR_BLUE_GRAY} />
              <ThemeColors defaultThemeColor={THEME_COLOR_GREEN} />
              <ThemeColors defaultThemeColor={THEME_COLOR_RED} />
              <ThemeColors defaultThemeColor={THEME_COLOR_ORANG} />
              <ThemeColors defaultThemeColor={THEME_COLOR_AMBER} />
              <ThemeColors defaultThemeColor={THEME_COLOR_CYAN} />
              <ThemeColors defaultThemeColor={THEME_COLOR_TEAL} />
              <ThemeColors defaultThemeColor={THEME_COLOR_LIGHT_GREEN} />
              <ThemeColors defaultThemeColor={THEME_COLOR_PINK} />
              <ThemeColors defaultThemeColor={THEME_COLOR_GRAY} />
            </Grid>
          </Grid>
        </form>
        <Grid item xs={12} sm={12}>
          <Button
            variant="contained"
            color={isMode === REMOVE ? "secondary" : "primary"}
            disableElevation
            onClick={(e) => handleClickSaveEvent(e)}
          >
            {isMode === REMOVE
              ? t("global_button_confirm")
              : t("global_button_save")}
          </Button>
          <Button
            variant="contained"
            color="default"
            disableElevation
            className={classes.margin}
            onClick={(e) => history.push("/auth/UserGroup")}
          >
            {t("global_button_close")}
          </Button>
        </Grid>
      </Grid>
      <ConfirmDialog
        isShow={isOpenConfirmDialog}
        isTitle={t("global_dialog_confirm_title")}
        isMessage={t("global_dialog_confirm_delete")}
        onOk={(e) => handleClickDeleteConfirmEvent(e)}
        onClose={(e) => setIsOpenConfirmDialog(false)}
      />
    </div>
  );
};

export default ManageUserGroup;
