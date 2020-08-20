import React, { useState } from "react";
import { SignUpService } from "../../../services/auth.service";
import { useTranslation } from "react-i18next";
import { Button, TextField } from "@material-ui/core";
import useStyles from "../../styles/signUp.style";
import MessageAlert from "../../message/alert";

export default (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState();
  const [alertMessage, setAlertMessage] = useState({
    isShow: false,
    isSeverity: null,
    isMessage: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let resp = await SignUpService(userInfo);
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
          id="firstName"
          label={t("std_signUp_first_name")}
          name="firstName"
          autoFocus
          onChange={(e) => {
            const firstName = {
              ...userInfo,
              first_name: e.target.value,
            };
            setUserInfo(firstName);
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="lastName"
          label={t("std_signUp_last_name")}
          name="lastName"
          onChange={(e) => {
            const lastName = {
              ...userInfo,
              last_name: e.target.value,
            };
            setUserInfo(lastName);
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label={t("std_email")}
          name="email"
          onChange={(e) => {
            const email = {
              ...userInfo,
              email: e.target.value,
            };
            setUserInfo(email);
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label={t("std_pass")}
          type="password"
          id="password"
          onChange={(e) => {
            const password = {
              ...userInfo,
              password: e.target.value,
            };
            setUserInfo(password);
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {t("std_signUp")}
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
