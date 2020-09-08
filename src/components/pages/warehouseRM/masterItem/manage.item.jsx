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
import ConfirmDialog from "../../../message/confirmDialog";
import * as globalHandleService from "../../../../services/global.warehouse.rm.handle.service";
import {
  TYPE_MASTER_ITEM,
  TYPE_MASTER_GROUP,
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

const ManageMasterItem = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { isOpen, isMode, isData, handleCloseDialog } = props;
  const initialData = useSelector((state) => state.reducerMasterItem.model);
  const GroupData = useSelector(
    (state) => state.reducerMasterGroup.data
  );
  const [masterData, setMasterData] = React.useState(initialData);
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = React.useState(false);
  const [selectGroup, setSelectGroup] = React.useState(false);

  const handleClickCloseEvent = () => {
    handleCloseDialog(masterData);
  };

  const handleSelectGroupClose = () => {
    setSelectGroup(false);
  };
  const handleSelectGroupOpen = () => {
    setSelectGroup(true);
  };

  useEffect(
    () => {
      setMasterData(isData);
      asyncGroup();
    },
    // eslint-disable-next-line
    [isData]
  );

  function asyncGroup() {
    (async () => {
      await globalHandleService.GlobalRequest(dispatch, TYPE_MASTER_GROUP);
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
            TYPE_MASTER_ITEM,
            masterData
          );
          break;
        case EDIT:
          resp = await globalHandleService.GlobalUpdate(
            dispatch,
            TYPE_MASTER_ITEM,
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
      TYPE_MASTER_ITEM,
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
              {t("ManageMasterItem")}
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
                  label={t("master_item_code")}
                  id="master_item_code"
                  required={true}
                  value={masterData.code}
                  disabled={isMode === NEW ? false : true}
                  autoFocus={isMode === NEW ? true : false}
                  inputProps={{ maxLength: 30 }}
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
                  label={t("master_item_name_thai")}
                  id="master_item_name_thai"
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
                  label={t("master_item_name_eng")}
                  id="master_item_name_eng"
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
              <Grid item xs={12} sm={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="select-group-open-select-label">
                    {t("master_item_group_name")}
                  </InputLabel>
                  <Select
                    labelId="select-group-open-select-label"
                    id="select-group"
                    open={selectGroup}
                    onClose={handleSelectGroupClose}
                    onOpen={handleSelectGroupOpen}
                    value={masterData.group_code}
                    disabled={isMode === REMOVE ? true : false}
                    onChange={(e) => {
                      setMasterData({
                        ...masterData,
                        group_code: e.target.value,
                        group_name: e._targetInst.memoizedProps.name,
                      });
                    }}
                  >
                    {GroupData.map((item, index) => (
                      <MenuItem
                        key={index}
                        value={item.code}
                        name={item.name_thai_with_warehouse}
                      >
                        {item.name_thai_with_warehouse}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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

ManageMasterItem.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isMode: PropTypes.string.isRequired,
  isData: PropTypes.any.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
};

export default ManageMasterItem;
