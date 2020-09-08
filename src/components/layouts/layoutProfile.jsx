import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { SignOutService } from "../../services/auth.service";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Configs from "../../configs";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Avatar,
  Divider,
  Box,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import TuneIcon from "@material-ui/icons/Tune";
import InfoIcon from "@material-ui/icons/Info";
import SchoolIcon from "@material-ui/icons/School";
import LayoutProfileStyles from "../styles/layoutProfile.style";
import LayoutProfileSetting from "../../components/layouts/layoutProfileSetting";
import LayoutProfileRegister from "../../components/layouts/layoutProfileRegister";
import LayoutProfileAbout from "../../components/layouts/layoutProfileAbout";
import ChangePasswordDialog from "../pages/accounts/changePassword";

function UserAvatar(prop) {
  const themeColor = useSelector((state) => state.globalSetting.themeColor);
  return (
    <Avatar
      alt="avatar"
      style={{
        width: 80,
        height: 80,
        fontSize: 80,
        backgroundColor: themeColor,
      }}
    >
      <PersonIcon style={{ fontSize: 50 }} />
    </Avatar>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index &&
        (index === 0 ? (
          <Box p={3}>
            <Typography>{children}</Typography>
            <LayoutProfileSetting />
          </Box>
        ) : index === 1 ? (
          <Box p={3}>
            <Typography>{children}</Typography>
            <LayoutProfileRegister />
          </Box>
        ) : (
          <Box p={3}>
            <Typography>{children}</Typography>
            <LayoutProfileAbout />
          </Box>
        ))}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const LayoutProfile = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = LayoutProfileStyles();
  const [tabState, setTabState] = React.useState({
    show: false,
    buttonNavValue: 0,
  });
  const [profileInfo, setProfileInfo] = React.useState();
  const [changePasswordDialog, setChangePasswordDialog] = React.useState({
    isShow: false,
    isData: {},
  });

  useEffect(
    () => {
      setProfileInfo(
        JSON.parse(
          localStorage.getItem(Configs.config.web_config.web_local_storage)
        )
      );
    }, // eslint-disable-next-line
    []
  );

  const handleSignOut = async (e) => {
    e.preventDefault();
    let resp = await SignOutService(dispatch, profileInfo);
    if (resp.status === 200) {
      history.push("/");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setChangePasswordDialog({
      ...changePasswordDialog,
      isShow: true,
    });
  };

  const handleCloseChangePasswordDialog = () => {
    setChangePasswordDialog({
      ...changePasswordDialog,
      isShow: false,
    });
  };

  return (
    <div className={classes.root}>
      <React.Fragment key={"right"}>
        <Card className={classes.card} square>
          <CardActionArea>
            <CardMedia className={classes.media}>
              <UserAvatar />
            </CardMedia>
            <CardContent>
              <Typography variant="h6" component="h2" className={classes.info}>
                {profileInfo != null ? profileInfo.fullName : ""}
              </Typography>
              <Typography
                variant="overline"
                display="block"
                className={classes.info}
              >
                {profileInfo != null ? profileInfo.sectionName : ""}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.info}
              >
                {profileInfo != null ? profileInfo.email : ""}
              </Typography>
              <Typography
                variant="overline"
                display="block"
                className={classes.info}
              >
                {profileInfo != null ? profileInfo.companyName : ""}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.action}>
            <Button fullWidth color="primary" onClick={handleSignOut}>
              {t("std_signOut")}
            </Button>
            <Button fullWidth color="primary" onClick={handleChangePassword}>
              {t("std_changePassw")}
            </Button>
          </CardActions>
        </Card>
        <BottomNavigation
          value={tabState.buttonNavValue}
          onChange={(event, newValue) => {
            setTabState({
              ...tabState,
              buttonNavValue: newValue,
            });
          }}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction
            value={0}
            label={t("std_setting")}
            icon={<TuneIcon />}
          />
          <BottomNavigationAction
            value={1}
            label={t("std_register")}
            icon={<SchoolIcon />}
          />
          <BottomNavigationAction
            value={2}
            label={t("std_about")}
            icon={<InfoIcon />}
          />
        </BottomNavigation>
        <Divider />
        <TabPanel value={tabState.buttonNavValue} index={0} />
        <TabPanel value={tabState.buttonNavValue} index={1} />
        <TabPanel value={tabState.buttonNavValue} index={2} />
      </React.Fragment>
      <ChangePasswordDialog
        isOpen={changePasswordDialog.isShow}
        handleCloseDialog={handleCloseChangePasswordDialog}
      />
    </div>
  );
};

export default LayoutProfile;
