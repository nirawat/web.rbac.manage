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
} from "@material-ui/core";
import {
  TYPE_PERMISSION_FUNC,
  MANAGE_PERMISSION_FUNC,
  EDIT,
} from "../../../redux/reducers/global.action.type";
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';

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

function CardPermissionFunc(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const {
    groupCode,
    nameThai,
    nameEng,
    groupLevel,
    count_func,
  } = props;

  const handleClickManageMember = (e) => {
    e.preventDefault();
    dispatch({
      type: TYPE_PERMISSION_FUNC,
      handle: MANAGE_PERMISSION_FUNC,
      payload: {
        groupCode: groupCode,
        groupName: nameThai,
      },
    });
    history.push("/auth/ManagePermissionFunc");
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="button" component="h2">
            {groupCode}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={8}>
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
            <Grid item xs={4}>
              <Badge badgeContent={count_func} color="secondary">
                <VerticalSplitIcon style={{ fontSize: 50, color:"#607d8b" }}/>
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
          {t("user_group_button_func")}
        </Button>
      </CardActions>
    </Card>
  );
}

CardPermissionFunc.propTypes = {
  groupCode: PropTypes.string.isRequired,
  nameThai: PropTypes.string.isRequired,
  nameEng: PropTypes.string.isRequired,
  groupLevel: PropTypes.number.isRequired,
  count_func: PropTypes.number.isRequired,
};

export default CardPermissionFunc;
