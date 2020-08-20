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
  Badge,
  Avatar,
} from "@material-ui/core";
import {
  TYPE_USER_GROUP,
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

function CardUserGroup(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const {
    groupCode,
    nameThai,
    nameEng,
    groupLevel,
    themeCode,
    count_member,
  } = props;

  const handleClickManage = (e, isMode) => {
    e.preventDefault();
    dispatch({
      type: TYPE_USER_GROUP,
      handle: HANDLE_MODE,
      payload: {
        isMode: isMode,
        model: {
          code: groupCode,
          name_thai: nameThai,
          name_eng: nameEng,
          group_level: groupLevel,
          theme_code: themeCode,
        },
      },
    });
    history.push("/auth/ManageUserGroup");
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="button" component="h2">
            {groupCode}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={9}>
              <Typography
                className={classes.content}
                variant="body2"
                color="textSecondary"
                component="div"
              >
                <CardContents
                  name={t("user_group_name_thai")}
                  content={nameThai}
                />
                <CardContents
                  name={t("user_group_name_eng")}
                  content={nameEng}
                />
                <CardContents
                  name={t("user_group_level")}
                  content={groupLevel}
                />
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Badge badgeContent={count_member} color="secondary">
                <Avatar style={{ backgroundColor: themeCode }} />
              </Badge>
            </Grid>
          </Grid>
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

CardUserGroup.propTypes = {
  groupCode: PropTypes.string.isRequired,
  nameThai: PropTypes.string.isRequired,
  nameEng: PropTypes.string.isRequired,
  groupLevel: PropTypes.number.isRequired,
  themeCode: PropTypes.string.isRequired,
  count_member:PropTypes.number.isRequired,
  count_role:PropTypes.number.isRequired,
};

export default CardUserGroup;
