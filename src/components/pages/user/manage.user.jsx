import React, { useEffect } from "react";
import clsx from "clsx";
import "date-fns";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  makeStyles,
  Button,
  Dialog,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Slide,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Input,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import CloseIcon from "@material-ui/icons/Close";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import ConfirmDialog from "../../message/confirmDialog";
import * as globalHandleService from "../../../services/global.handle.service";
import {
  TYPE_USER,
  TYPE_SECTION,
  TYPE_POSITION,
  NEW,
  EDIT,
  REMOVE,
} from "../../../redux/reducers/global.action.type.jsx";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    margin: theme.spacing(2),
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(0),
    flex: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: "90%",
  },
  rating: {
    display: "flex",
    flexDirection: "column",
    "& > * + *": {
      marginTop: theme.spacing(1),
    },
  },
  avatarLarge: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  formControl: {
    margin: theme.spacing(1),
    width: "90%",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ManageUser = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { isOpen, isMode, isData, handleCloseDialog } = props;
  const initialData = useSelector((state) => state.reducerUser.model);
  const sectionData = useSelector((state) => state.reducerSection.data);
  const positionData = useSelector((state) => state.reducerPosition.data);
  const [masterData, setMasterData] = React.useState(initialData);
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = React.useState(false);
  const [selectLanguage, setSelectLanguage] = React.useState(false);
  const [selectSection, setSelectSection] = React.useState(false);
  const [selectPosition, setSelectPosition] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSelectLanguageClose = () => {
    setSelectLanguage(false);
  };
  
  const handleSelectLanguageOpen = () => {
    setSelectLanguage(true);
  };

  const handleSelectSectionClose = () => {
    setSelectSection(false);
  };
  const handleSelectSectionOpen = () => {
    setSelectSection(true);
  };

  const handleSelectPositionClose = () => {
    setSelectPosition(false);
  };
  const handleSelectPositionOpen = () => {
    setSelectPosition(true);
  };

  const handleClickCloseEvent = () => {
    handleCloseDialog(masterData);
  };

  useEffect(
    () => {
      setMasterData(isData);
      if (sectionData.length <= 0) {
        asyncSection();
        asyncPosition();
      }
    },
    // eslint-disable-next-line
    [isData]
  );

  function asyncSection() {
    (async () => {
      await globalHandleService.GlobalRequest(dispatch, TYPE_SECTION);
    })();
  }

  function asyncPosition() {
    (async () => {
      await globalHandleService.GlobalRequest(dispatch, TYPE_POSITION);
    })();
  }

  const handleClickSaveEvent = async (e) => {
    e.preventDefault();
    if (isMode === REMOVE) {
      setIsOpenConfirmDialog(true);
    } else {
      let resp;
      switch (isMode) {
        case NEW:
          resp = await globalHandleService.GlobalInsert(
            dispatch,
            TYPE_USER,
            masterData
          );
          break;
        case EDIT:
          resp = await globalHandleService.GlobalUpdate(
            dispatch,
            TYPE_USER,
            masterData
          );
          break;
        default:
          break;
      }
      if (resp.status === 200) {
        setMasterData(initialData);
        handleCloseDialog(false);
      }
    }
  };

  const handleClickDeleteConfirmEvent = async (e) => {
    e.preventDefault();
    setIsOpenConfirmDialog(false);
    let resp = await globalHandleService.GlobalDelete(
      dispatch,
      TYPE_USER,
      masterData
    );
    if (resp.status === 200) {
      setMasterData(initialData);
      handleCloseDialog(false);
    }
  };

  const handleDateChange = (date) => {
    setMasterData({
      ...masterData,
      activate_date: new Date(date),
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={isOpen}
        onClose={handleClickCloseEvent}
        TransitionComponent={Transition}
      >
        <AppBar
          className={classes.appBar}
          color={isMode === REMOVE ? "secondary" : "primary"}
        >
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClickCloseEvent}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {t("ManageUser")}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClickSaveEvent}>
              {isMode === NEW
                ? t("global_button_save")
                : isMode === EDIT
                ? t("global_button_update")
                : isMode === REMOVE
                ? t("global_button_delete")
                : ""}
            </Button>
          </Toolbar>
        </AppBar>
        <>
          <form className={classes.root} autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t("user_id")}
                  id="account_id"
                  required={true}
                  value={masterData.account_id}
                  disabled
                  className={clsx(classes.margin, classes.textField)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-controlled-open-select-label">
                    {t("user_language")}
                  </InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={selectLanguage}
                    onClose={handleSelectLanguageClose}
                    onOpen={handleSelectLanguageOpen}
                    value={masterData.language}
                    disabled={isMode === REMOVE ? true : false}
                    onChange={(e) =>
                      setMasterData({
                        ...masterData,
                        language: e.target.value,
                      })
                    }
                  >
                    <MenuItem value={"EN"}>English</MenuItem>
                    <MenuItem value={"TH"}>Thai</MenuItem>
                    <MenuItem value={"CH"}>Chines</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t("user_email")}
                  id="email"
                  type="email"
                  required={true}
                  value={masterData.email}
                  disabled={isMode === REMOVE ? true : false}
                  autoFocus={isMode === REMOVE ? false : true}
                  onChange={(e) =>
                    setMasterData({
                      ...masterData,
                      email: e.target.value,
                    })
                  }
                  className={clsx(classes.margin, classes.textField)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
                  <InputLabel htmlFor="standard-adornment-password">
                    {t("user_password")}
                  </InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={masterData.password}
                    required={true}
                    disabled={isMode === REMOVE ? true : false}
                    onChange={(e) =>
                      setMasterData({
                        ...masterData,
                        password: e.target.value,
                      })
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t("user_prefixes")}
                  id="prefixes"
                  value={masterData.prefixes}
                  disabled={isMode === REMOVE ? true : false}
                  onChange={(e) =>
                    setMasterData({
                      ...masterData,
                      prefixes: e.target.value,
                    })
                  }
                  className={clsx(classes.margin, classes.textField)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t("user_first_name")}
                  id="first_name"
                  value={masterData.first_name}
                  required={true}
                  disabled={isMode === REMOVE ? true : false}
                  onChange={(e) =>
                    setMasterData({
                      ...masterData,
                      first_name: e.target.value,
                    })
                  }
                  className={clsx(classes.margin, classes.textField)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t("user_last_name")}
                  id="last_name"
                  value={masterData.last_name}
                  disabled={isMode === REMOVE ? true : false}
                  onChange={(e) =>
                    setMasterData({
                      ...masterData,
                      last_name: e.target.value,
                    })
                  }
                  className={clsx(classes.margin, classes.textField)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="select-section-open-select-label">
                    {t("user_section")}
                  </InputLabel>
                  <Select
                    labelId="select-section-open-select-label"
                    id="select-section"
                    open={selectSection}
                    onClose={handleSelectSectionClose}
                    onOpen={handleSelectSectionOpen}
                    value={masterData.section_code}
                    disabled={isMode === REMOVE ? true : false}
                    onChange={(e) => {
                      setMasterData({
                        ...masterData,
                        section_code: e.target.value,
                        section_name: e._targetInst.memoizedProps.name,
                      });
                    }}
                  >
                    {sectionData.map((item, index) => (
                      <MenuItem
                        key={index}
                        value={item.code}
                        name={item.name_thai}
                      >
                        {item.name_thai}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="select-position-open-select-label">
                    {t("user_position")}
                  </InputLabel>
                  <Select
                    labelId="select-position-open-select-label"
                    id="select-position"
                    open={selectPosition}
                    onClose={handleSelectPositionClose}
                    onOpen={handleSelectPositionOpen}
                    value={masterData.position_code}
                    disabled={isMode === REMOVE ? true : false}
                    onChange={(e) => {
                      setMasterData({
                        ...masterData,
                        position_code: e.target.value,
                        position_name: e._targetInst.memoizedProps.name,
                      });
                    }}
                  >
                    {positionData.map((item, index) => (
                      <MenuItem
                        key={index}
                        value={item.code}
                        name={item.name_thai}
                      >
                        {item.name_thai}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    //disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    id="date-picker-inline"
                    label={t("user_activate_date")}
                    required={true}
                    disabled={isMode === REMOVE ? true : false}
                    value={masterData.activate_date}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    className={clsx(classes.margin, classes.textField)}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
          </form>
        </>
        <ConfirmDialog
          isShow={isOpenConfirmDialog}
          isTitle={t("global_dialog_confirm_title")}
          isMessage={t("global_dialog_confirm_delete")}
          onOk={(e) => handleClickDeleteConfirmEvent(e)}
          onClose={(e) => setIsOpenConfirmDialog(false)}
        />
      </Dialog>
    </div>
  );
};

ManageUser.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isMode: PropTypes.string.isRequired,
  isData: PropTypes.any.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
};

export default ManageUser;
