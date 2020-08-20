import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles, Grid, Button, TextField } from "@material-ui/core";
import * as globalRBACService from "../../../services/global.rbac.service";
import { TYPE_REGISTER } from "../../../redux/reducers/global.action.type";

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

const ActiveRegister = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const initialData = useSelector((state) => state.reducerRegister.model);
  const [_model, setModel] = React.useState(initialData);

  useEffect(() => {
    setModel(initialData);
  }, [initialData]);

  const handleClickSaveEvent = async (e) => {
    e.preventDefault();
    let resp = await globalRBACService.ActivateRegister(
      dispatch,
      TYPE_REGISTER,
      _model
    );
    if (resp.status === 200) {
      setModel({ ..._model, activate: true });
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
              onChange={(e) =>
                setModel({ ..._model, register_id: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              disabled
              label={t("register_sys_id")}
              id="register_sys_id"
              required={true}
              value={_model.system_id}
              onChange={(e) =>
                setModel({ ..._model, system_id: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              label={t("register_token")}
              id="register_token"
              required={true}
              value={_model.token}
              multiline
              rows={4}
              autoFocus
              onChange={(e) => setModel({ ..._model, token: e.target.value })}
            />
          </Grid>
        </form>
        <Grid item xs={12} sm={12}>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={(e) => handleClickSaveEvent(e)}
          >
            {t("global_button_confirm")}
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
    </div>
  );
};

export default ActiveRegister;
