import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  makeStyles,
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import * as globalHandleService from "../../../services/global.handle.service";
import ConfirmDialog from "../../message/confirmDialog";
import {
  TYPE_REGISTER,
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
  formControl: {
    margin: theme.spacing(1),
    width: "98%",
  },
}));

const ManageRegister = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = React.useState(false);
  const initialData = useSelector((state) => state.reducerRegister.model);
  const isMode = useSelector((state) => state.reducerRegister.isMode);
  const [_model, setModel] = React.useState(initialData);
  const [selectContry, setSelectContry] = React.useState(false);

  const handleSelectContryClose = () => {
    setSelectContry(false);
  };
  const handleSelectContryOpen = () => {
    setSelectContry(true);
  };

  useEffect(() => {
    setModel(
      isMode === NEW
        ? {
            register_id: "",
            system_id: "",
            token: "",
            name_thai: "",
            name_eng: "",
            address: "",
            email: "",
            website: "",
            tel: "",
            fax: "",
            contact: "",
            country: "",
            register_date: new Date(Date.now()),
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
            TYPE_REGISTER,
            _model
          );
          break;
        case EDIT:
          resp = await globalHandleService.GlobalUpdate(
            dispatch,
            TYPE_REGISTER,
            _model
          );
          break;
        default:
          break;
      }
      if (resp.status === 200) {
        history.push("/auth/Register");
      }
    }
  };

  const handleClickDeleteConfirmEvent = async (e) => {
    e.preventDefault();
    setIsOpenConfirmDialog(false);
    let resp = await globalHandleService.GlobalDelete(
      dispatch,
      TYPE_REGISTER,
      _model
    );
    if (resp.status === 200) {
      history.push("/auth/Register");
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <form className={classes.textField} noValidate autoComplete="off">
          <Grid item xs={12} sm={12}>
            <TextField
              disabled
              label={t("register_id")}
              id="register_id"
              required={true}
              value={_model.register_id}
              autoFocus={isMode === NEW ? true : false}
              onChange={(e) =>
                setModel({ ..._model, register_id: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              disabled={isMode === NEW ? false : true}
              label={t("register_sys_id")}
              id="register_sys_id"
              required={true}
              value={_model.system_id}
              autoFocus={isMode === NEW ? true : false}
              onChange={(e) =>
                setModel({ ..._model, system_id: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              disabled={isMode === REMOVE ? true : false}
              label={t("register_name_thai")}
              id="register_name_thai"
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
              label={t("register_name_eng")}
              id="register_name_eng"
              required={true}
              value={_model.name_eng}
              onChange={(e) =>
                setModel({ ..._model, name_eng: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              disabled={isMode === REMOVE ? true : false}
              label={t("register_address")}
              id="register_address"
              required={true}
              value={_model.address}
              onChange={(e) => setModel({ ..._model, address: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              disabled={isMode === REMOVE ? true : false}
              label={t("register_email")}
              id="register_email"
              required={true}
              value={_model.email}
              onChange={(e) => setModel({ ..._model, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              disabled={isMode === REMOVE ? true : false}
              label={t("register_website")}
              id="register_website"
              required={true}
              value={_model.website}
              onChange={(e) => setModel({ ..._model, website: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              disabled={isMode === REMOVE ? true : false}
              label={t("register_tel")}
              id="register_tel"
              required={true}
              value={_model.tel}
              onChange={(e) => setModel({ ..._model, tel: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              disabled={isMode === REMOVE ? true : false}
              label={t("register_fax")}
              id="register_fax"
              required={true}
              value={_model.fax}
              onChange={(e) => setModel({ ..._model, fax: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              disabled={isMode === REMOVE ? true : false}
              label={t("register_contract")}
              id="register_contract"
              required={true}
              value={_model.contact}
              onChange={(e) => setModel({ ..._model, contact: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-controlled-open-select-label">
                {t("register_country")}
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={selectContry}
                onClose={handleSelectContryClose}
                onOpen={handleSelectContryOpen}
                value={_model.country}
                disabled={isMode === REMOVE ? true : false}
                onChange={(e) =>
                  setModel({ ..._model, country: e.target.value })
                }
              >
                <MenuItem value={"EN"}>English</MenuItem>
                <MenuItem value={"TH"}>Thai</MenuItem>
                <MenuItem value={"CH"}>Chines</MenuItem>
              </Select>
            </FormControl>
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
            onClick={(e) => history.push("/auth/Register")}
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

export default ManageRegister;
