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
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ConfirmDialog from "../../../message/confirmDialog";
import * as globalHandleService from "../../../../services/global.warehouse.rm.handle.service";
import {
  TYPE_MASTER_WAREHOUSE,
  NEW,
  EDIT,
  REMOVE,
} from "../../../../redux/reducers/global.action.type.jsx";

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
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: "95%",
  },
  formControl: {
    margin: theme.spacing(1),
    width: "95%",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ManageMasterWarehouse = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { isOpen, isMode, isData, handleCloseDialog } = props;
  const initialData = useSelector((state) => state.reducerMasterWarehouse.model);
  const [masterData, setMasterData] = React.useState(initialData);
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = React.useState(false);

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
            TYPE_MASTER_WAREHOUSE,
            masterData
          );
          break;
        case EDIT:
          resp = await globalHandleService.GlobalUpdate(
            dispatch,
            TYPE_MASTER_WAREHOUSE,
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
      TYPE_MASTER_WAREHOUSE,
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
              {t("ManageMasterWarehouse")}
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
              <Grid item xs={12} sm={12}>
                <TextField
                  label={t("master_warehouse_code")}
                  id="master_warehouse_code"
                  required={true}
                  value={masterData.code}
                  disabled={isMode === NEW ? false : true}
                  autoFocus={isMode === NEW ? true : false}
                  inputProps={{ maxLength: 2 }}
                  onChange={(e) =>
                    setMasterData({
                      ...masterData,
                      code: e.target.value,
                    })
                  }
                  className={clsx(classes.margin, classes.textField)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  label={t("master_warehouse_name_thai")}
                  id="master_warehouse_name_thai"
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
              <Grid item xs={12} sm={12}>
                <TextField
                  label={t("master_warehouse_name_eng")}
                  id="master_warehouse_name_eng"
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

ManageMasterWarehouse.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isMode: PropTypes.string.isRequired,
  isData: PropTypes.any.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
};

export default ManageMasterWarehouse;
