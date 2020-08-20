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
  Divider,
} from "@material-ui/core";
import {
  TYPE_TOKEN_KEY,
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

function CardTokenKey(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const {
    tokenCode,
    tokenSecret,
    tokenIssuer,
    tokenAudience,
    tokenExpire,
  } = props;

  const handleClickManage = (e, isMode) => {
    e.preventDefault();
    dispatch({
      type: TYPE_TOKEN_KEY,
      handle: HANDLE_MODE,
      payload: {
        isMode: isMode,
        model: {
          code: tokenCode,
          secret: tokenSecret,
          issuer: tokenIssuer,
          audience: tokenAudience,
          expire: tokenExpire,
        },
      },
    });
    history.push("/auth/ManageTokenKey");
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="button" component="h2">
            {tokenCode}
          </Typography>
          <Typography
            className={classes.content}
            variant="body2"
            color="textSecondary"
            component="div"
          >
            <CardContents name={t("token_issuer")} content={tokenIssuer} />
            <CardContents name={t("token_audience")} content={tokenAudience} />
            <CardContents name={t("token_expire")} content={tokenExpire} />
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider />
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={(e) => handleClickManage(e, EDIT)}
        >
          {t("global_button_edit")}
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

CardTokenKey.propTypes = {
  tokenCode: PropTypes.string.isRequired,
  tokenSecret: PropTypes.string.isRequired,
  tokenIssuer: PropTypes.string.isRequired,
  tokenAudience: PropTypes.string.isRequired,
  tokenExpire: PropTypes.number.isRequired,
};

export default CardTokenKey;
