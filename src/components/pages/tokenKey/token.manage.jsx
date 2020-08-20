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
} from "@material-ui/core";
import * as globalHandleService from "../../../services/global.handle.service";
import ConfirmDialog from "../../message/confirmDialog";
import {
  TYPE_TOKEN_KEY,
  NEW,
  EDIT,
  REMOVE,
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
  slider: {
    marginLeft: theme.spacing(1),
    width: "98%",
    height: theme.spacing(1),
  },
}));

const sliderMarks = [
  {
    value: 2,
    label: "2",
  },
  {
    value: 6,
    label: "6",
  },
  {
    value: 10,
    label: "10",
  },
  {
    value: 30,
    label: "30",
  },
  {
    value: 60,
    label: "60",
  },
];

function sliderValueText(value) {
  return `${value}`;
}

const ManageTokenKey = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = React.useState(false);
  const initialData = useSelector((state) => state.reducerTokenKey.model);
  const isMode = useSelector((state) => state.reducerTokenKey.isMode);
  const [_model, setModel] = React.useState(initialData);

  useEffect(() => {
    setModel(
      isMode === NEW
        ? { code: "", secret: "", issuer: "", audience: "", expire: 2 }
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
            TYPE_TOKEN_KEY,
            _model
          );
          break;
        case EDIT:
          resp = await globalHandleService.GlobalUpdate(
            dispatch,
            TYPE_TOKEN_KEY,
            _model
          );
          break;
        default:
          break;
      }
      if (resp.status === 200) {
        history.push("/auth/TokenKey");
      }
    }
  };

  const handleClickDeleteConfirmEvent = async (e) => {
    e.preventDefault();
    setIsOpenConfirmDialog(false);
    let resp = await globalHandleService.GlobalDelete(
      dispatch,
      TYPE_TOKEN_KEY,
      _model
    );
    if (resp.status === 200) {
      history.push("/auth/TokenKey");
    }
  };

  const handleSliderChange = (e, newValue) => {
    setModel({ ..._model, expire: Number(newValue) });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <form className={classes.textField} noValidate autoComplete="off">
          <Grid item xs={12} sm={12}>
            <TextField
              disabled={isMode === NEW ? false : true}
              label={t("token_code")}
              id="token_code"
              required={true}
              value={_model.code}
              autoFocus={isMode === NEW ? true : false}
              onChange={(e) => setModel({ ..._model, code: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              disabled={isMode === REMOVE ? true : false}
              label={t("token_secret")}
              id="token_secret"
              required={true}
              value={_model.secret}
              multiline
              rows={3}
              autoFocus={isMode === EDIT ? true : false}
              onChange={(e) => setModel({ ..._model, secret: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              disabled={isMode === REMOVE ? true : false}
              label={t("token_issuer")}
              id="token_issuer"
              required={true}
              value={_model.issuer}
              onChange={(e) => setModel({ ..._model, issuer: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              disabled={isMode === REMOVE ? true : false}
              label={t("token_audience")}
              id="token_audience"
              required={true}
              value={_model.audience}
              onChange={(e) =>
                setModel({ ..._model, audience: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography
              id="discrete-slider-always"
              color={"textSecondary"}
              gutterBottom
            >
              {t("token_expire")}
            </Typography>
            <Slider
              className={classes.slider}
              disabled={isMode === REMOVE ? true : false}
              defaultValue={_model.expire}
              value={_model.expire}
              getAriaValueText={sliderValueText}
              aria-labelledby="discrete-slider-always"
              step={2}
              min={0}
              max={60}
              marks={sliderMarks}
              valueLabelDisplay="on"
              onChange={handleSliderChange}
            />
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
            onClick={(e) => history.push("/auth/TokenKey")}
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

export default ManageTokenKey;
