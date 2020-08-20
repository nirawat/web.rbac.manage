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
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ConfirmDialog from "../../message/confirmDialog";
import * as globalHandleService from "../../../services/global.handle.service";
import {
  TYPE_FUNCTION_MENU,
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

const ManageFunctionMenu = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { isOpen, isMode, isData, handleCloseDialog } = props;
  const initialData = useSelector((state) => state.reducerFuncMenu.model);
  const [masterData, setMasterData] = React.useState(initialData);
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = React.useState(false);
  const [selectType, setSelectType] = React.useState(false);

  const handleSelectTypeClose = () => {
    setSelectType(false);
  };
  const handleSelectTypeOpen = () => {
    setSelectType(true);
  };

  const handleClickCloseEvent = () => {
    handleCloseDialog(masterData);
  };

  useEffect(
    () => {
      setMasterData(isData);
    },
    // eslint-disable-next-line
    [isData]
  );

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
            TYPE_FUNCTION_MENU,
            masterData
          );
          break;
        case EDIT:
          resp = await globalHandleService.GlobalUpdate(
            dispatch,
            TYPE_FUNCTION_MENU,
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
      TYPE_FUNCTION_MENU,
      masterData
    );
    if (resp.status === 200) {
      setMasterData(initialData);
      handleCloseDialog(false);
    }
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
                  label={t("func_code")}
                  id="func_code"
                  required={true}
                  value={masterData.code}
                  disabled={isMode === NEW ? false : true}
                  autoFocus={isMode === NEW ? true : false}
                  onChange={(e) =>
                    setMasterData({
                      ...masterData,
                      code: e.target.value,
                    })
                  }
                  className={clsx(classes.margin, classes.textField)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t("func_name_thai")}
                  id="func_name_thai"
                  required={true}
                  value={masterData.name_thai}
                  disabled={isMode === REMOVE ? true : false}
                  autoFocus={isMode === NEW ? false : true}
                  onChange={(e) =>
                    setMasterData({
                      ...masterData,
                      name_thai: e.target.value,
                    })
                  }
                  className={clsx(classes.margin, classes.textField)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t("func_name_eng")}
                  id="func_name_eng"
                  required={true}
                  value={masterData.name_eng}
                  disabled={isMode === REMOVE ? true : false}
                  onChange={(e) =>
                    setMasterData({
                      ...masterData,
                      name_eng: e.target.value,
                    })
                  }
                  className={clsx(classes.margin, classes.textField)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t("func_route_path")}
                  id="func_route_path"
                  value={masterData.route_path}
                  required={true}
                  disabled={isMode === REMOVE ? true : false}
                  onChange={(e) =>
                    setMasterData({
                      ...masterData,
                      route_path: e.target.value,
                    })
                  }
                  className={clsx(classes.margin, classes.textField)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t("func_icon_name")}
                  id="func_icon_name"
                  value={masterData.icon_name}
                  required={true}
                  disabled={isMode === REMOVE ? true : false}
                  onChange={(e) =>
                    setMasterData({
                      ...masterData,
                      icon_name: e.target.value,
                    })
                  }
                  className={clsx(classes.margin, classes.textField)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-controlled-open-select-label">
                    {t("func_type")}
                  </InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={selectType}
                    onClose={handleSelectTypeClose}
                    onOpen={handleSelectTypeOpen}
                    value={masterData.func_type}
                    disabled={isMode === REMOVE ? true : false}
                    onChange={(e) =>
                      setMasterData({
                        ...masterData,
                        func_type: e.target.value,
                      })
                    }
                  >
                    <MenuItem value={"Main"}>Main</MenuItem>
                    <MenuItem value={"MainSub"}>MainSub</MenuItem>
                    <MenuItem value={"SubMenu"}>SubMenu</MenuItem>
                    <MenuItem value={"Divider"}>Divider</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t("func_ref_sub")}
                  id="func_ref_sub"
                  value={masterData.func_ref_sub}
                  required={true}
                  disabled={isMode === REMOVE ? true : false}
                  onChange={(e) =>
                    setMasterData({
                      ...masterData,
                      func_ref_sub: e.target.value,
                    })
                  }
                  className={clsx(classes.margin, classes.textField)}
                />
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

ManageFunctionMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isMode: PropTypes.string.isRequired,
  isData: PropTypes.any.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
};

export default ManageFunctionMenu;
