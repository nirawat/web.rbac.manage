import React, { useState } from "react";
import { ForgotPasswordService } from "../../../services/auth.service";
import { useTranslation } from "react-i18next";
import { Button, TextField } from "@material-ui/core";
import useStyles from "../../styles/signIn.style";
import MessageAlert from "../../message/alert";

export default () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [forgotPassword, setForgotPassword] = useState();
  const [alertMessage, setAlertMessage] = useState({
    isShow: false,
    isSeverity: null,
    isMessage: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let resp = await ForgotPasswordService(forgotPassword);
    setAlertMessage({
      ...alertMessage,
      isShow: true,
      isStatus: resp.status,
      isMessage: resp.message,
    });
  };

  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label={t("std_email")}
          name="email"
          autoFocus
          onChange={(e) => {
            setForgotPassword({
              ...forgotPassword,
              email: e.target.value,
            });
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {t("std_forgot_send")}
        </Button>
      </form>
      <MessageAlert
        isShow={alertMessage.isShow}
        isStatus={alertMessage.isStatus}
        isMessage={alertMessage.isMessage}
        onClose={(e) => setAlertMessage({ isShow: false })}
      />
    </>
  );
};
