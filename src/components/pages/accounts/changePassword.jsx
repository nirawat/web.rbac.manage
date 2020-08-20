import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { ChangePasswordService } from "../../../services/auth.service";
import Configs from "../../../configs";

const ChangePasswordDialog = (props) => {
  //const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { isOpen, handleCloseDialog } = props;
  const [infoChange, setInfoChange] = React.useState({
    account_id: "",
    email: "",
    new_password: "",
    confirm_password: "",
  });

  useEffect(
    () => {
      const accountInfo = JSON.parse(
        localStorage.getItem(Configs.config.web_config.web_local_storage)
      );
      setInfoChange({
        ...infoChange,
        account_id: accountInfo.accountId,
        email: accountInfo.email,
      });
    }, // eslint-disable-next-line
    []
  );

  const handleClickConfirmEvent = async (e) => {
    e.preventDefault();
    let resp = await ChangePasswordService(dispatch, infoChange);
    if (resp.status === 200) {
      history.push("/");
    }
  };

  const handleClickCloseEvent = () => {
    handleCloseDialog();
  };

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={handleClickCloseEvent}
        aria-labelledby="dialog-title"
      >
        <DialogTitle id="dialog-title">
          {t("change_password_title")}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            disabled
            fullWidth
            name="account_id"
            label={t("change_password_account_id")}
            id="account_id"
            value={infoChange.account_id}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            autoFocus
            name="new_password"
            label={t("change_password_new_password")}
            type="password"
            id="new_password"
            value={infoChange.new_password}
            inputProps={{ minLength: 6, maxLength: 10 }}
            onChange={(e) => {
              setInfoChange({
                ...infoChange,
                new_password: e.target.value,
              });
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirm_password"
            label={t("change_password_confirm_password")}
            type="password"
            id="confirm_password"
            value={infoChange.confirm_password}
            inputProps={{ minLength: 6, maxLength: 10 }}
            onChange={(e) => {
              setInfoChange({
                ...infoChange,
                confirm_password: e.target.value,
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={(e) => handleClickConfirmEvent(e)}
            color="primary"
          >
            {t("global_button_confirm")}
          </Button>
          <Button onClick={handleClickCloseEvent} color="secondary">
            {t("global_button_close")}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

ChangePasswordDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
};

export default ChangePasswordDialog;
