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
  TYPE_PERMISSION_GROUP,
  MANAGE_PERMISSION_GROUP,
  EDIT,
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

function CardPermissionGroup(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { groupCode, nameThai, nameEng, groupLevel, count_member } = props;

  const handleClickManageMember = (e) => {
    e.preventDefault();
    dispatch({
      type: TYPE_PERMISSION_GROUP,
      handle: MANAGE_PERMISSION_GROUP,
      payload: {
        groupCode: groupCode,
        groupName: nameThai,
      },
    });
    history.push("/auth/ManagePermissionGroup");
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
                <Avatar style={{ backgroundColor: "#607d8b" }} />
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
          onClick={(e) => handleClickManageMember(e, EDIT)}
        >
          {t("user_group_button_member")}
        </Button>
      </CardActions>
    </Card>
  );
}

CardPermissionGroup.propTypes = {
  groupCode: PropTypes.string.isRequired,
  nameThai: PropTypes.string.isRequired,
  nameEng: PropTypes.string.isRequired,
  groupLevel: PropTypes.number.isRequired,
  themeCode: PropTypes.string.isRequired,
  count_member: PropTypes.number.isRequired,
};

export default CardPermissionGroup;
