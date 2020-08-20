import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import {
  makeStyles,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  Typography,
  Box,
  Grid,
  Divider,
} from "@material-ui/core";
import BrightnessAutoIcon from "@material-ui/icons/BrightnessAuto";
import {
  TYPE_REGISTER,
  HANDLE_MODE,
  EDIT,
  REMOVE,
} from "../../../redux/reducers/global.action.type";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  content: {
    whiteSpace: "nowrap",
  },
}));

const CardContents = (prop) => {
  return (
    <Box component="div" textOverflow="ellipsis" overflow="hidden">
      {prop.name} : {prop.content}
    </Box>
  );
};

function CardRegister(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { model } = props;

  const handleClickManage = (e, isMode) => {
    e.preventDefault();
    dispatch({
      type: TYPE_REGISTER,
      handle: HANDLE_MODE,
      payload: {
        isMode: isMode,
        model: model,
      },
    });
    history.push("/auth/ManageRegister");
  };

  const handleClickActive = (e, isMode) => {
    e.preventDefault();
    dispatch({
      type: TYPE_REGISTER,
      handle: HANDLE_MODE,
      payload: {
        isMode: isMode,
        model: model,
      },
    });
    history.push("/auth/ActiveRegister");
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <BrightnessAutoIcon
                style={{
                  fontSize: 50,
                  color: model.activate ? "#ffc107" : "#e0e0e0",
                }}
              />
            </Grid>
            <Grid item xs={10}>
              <Typography
                className={classes.content}
                variant="body2"
                color="textSecondary"
                component="div"
              >
                <Typography gutterBottom variant="button" component="h2">
                  {model.system_id}
                </Typography>
                <CardContents
                  name={t("register_name_thai")}
                  content={model.name_thai}
                />
                <CardContents
                  name={t("register_name_eng")}
                  content={model.name_eng}
                />
                <CardContents
                  name={t("register_date")}
                  content={new Date(model.register_date).toLocaleDateString(
                    "en-GB"
                  )}
                />
                <CardContents
                  name={t("register_activate_date")}
                  content={
                    model.activate_date === "1999-01-01T00:00:00"
                      ? "-"
                      : new Date(model.activate_date).toLocaleDateString(
                          "en-GB"
                        )
                  }
                />
                <CardContents
                  name={t("register_expire_date")}
                  content={
                    model.expire_date === "1999-01-01T00:00:00"
                      ? "-"
                      : new Date(model.expire_date).toLocaleDateString("en-GB")
                  }
                />
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
      <Divider />
      <CardActions>
        <Button
          size="small"
          color="primary"
          disabled={model.activate}
          onClick={(e) => handleClickManage(e, EDIT)}
        >
          {t("user_group_button_register")}
        </Button>
        <Button
          size="small"
          color="primary"
          disabled={model.activate}
          onClick={(e) => handleClickActive(e, EDIT)}
        >
          {t("global_button_activate")}
        </Button>
        <Button
          size="small"
          color="secondary"
          onClick={(e) => handleClickManage(e, REMOVE)}
        >
          {t("global_button_delete")}
        </Button>
      </CardActions>
    </Card>
  );
}

CardRegister.propTypes = {
  model: PropTypes.any.isRequired,
};

export default CardRegister;
