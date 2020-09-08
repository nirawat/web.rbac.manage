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
  TYPE_MASTER_ITEM_SKU,
  TYPE_MASTER_UNIT,
  TYPE_MASTER_COLOR,
  TYPE_MASTER_SIZE,
  NEW,
  EDIT,
  REMOVE,
  DELETE,
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
    width: "90%",
  },
  formControl: {
    margin: theme.spacing(1),
    width: "90%",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ManageMasterItemSku = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { isOpen, isMode, isData, handleCloseDialog } = props;
  const initialData = useSelector((state) => state.reducerMasterItem.model);
  const ColorData = useSelector((state) => state.reducerMasterColor.data);
  const SizeData = useSelector((state) => state.reducerMasterSize.data);
  const BasicUnitData = useSelector((state) => state.reducerMasterUnit.data);
  const AltUnitData = useSelector((state) => state.reducerMasterUnit.data);
  const [masterData, setMasterData] = React.useState(initialData);
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = React.useState(false);
  const [selectColor, setSelectColor] = React.useState(false);
  const [selectSize, setSelectSize] = React.useState(false);
  const [selectBasicUnit, setSelectBasicUnit] = React.useState(false);
  const [selectAltUnit, setSelectAltUnit] = React.useState(false);
  const [selectAltFactor, setSelectAltFactor] = React.useState(false);
  const [selectReceiveType, setSelectReceiveType] = React.useState(false);
  const [selectIssueType, setSelectIssueType] = React.useState(false);

  const handleClickCloseEvent = () => {
    handleCloseDialog(masterData);
  };

  const handleSelectColorClose = () => {
    setSelectColor(false);
  };
  const handleSelectColorOpen = () => {
    setSelectColor(true);
  };

  const handleSelectSizeClose = () => {
    setSelectSize(false);
  };
  const handleSelectSizeOpen = () => {
    setSelectSize(true);
  };

  const handleSelectBasicUnitClose = () => {
    setSelectBasicUnit(false);
  };
  const handleSelectBasicUnitOpen = () => {
    setSelectBasicUnit(true);
  };

  const handleSelectAltUnitClose = () => {
    setSelectAltUnit(false);
  };
  const handleSelectAltUnitOpen = () => {
    setSelectAltUnit(true);
  };

  const handleSelectAltFactorClose = () => {
    setSelectAltFactor(false);
  };
  const handleSelectAltFactorOpen = () => {
    setSelectAltFactor(true);
  };

  const handleSelectReceiveTypeClose = () => {
    setSelectReceiveType(false);
  };
  const handleSelectReceiveTypeOpen = () => {
    setSelectReceiveType(true);
  };

  const handleSelectIssueTypeClose = () => {
    setSelectIssueType(false);
  };
  const handleSelectIssueTypeOpen = () => {
    setSelectIssueType(true);
  };

  useEffect(
    () => {
      setMasterData(isData);
      asyncUnit();
      asyncColor();
      asyncSize();
    },
    // eslint-disable-next-line
    [isData]
  );

  function asyncColor() {
    (async () => {
      await globalHandleService.GlobalRequest(dispatch, TYPE_MASTER_COLOR);
    })();
  }

  function asyncSize() {
    (async () => {
      await globalHandleService.GlobalRequest(dispatch, TYPE_MASTER_SIZE);
    })();
  }

  function asyncUnit() {
    (async () => {
      await globalHandleService.GlobalRequest(dispatch, TYPE_MASTER_UNIT);
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
            TYPE_MASTER_ITEM_SKU,
            masterData
          );
          break;
        case EDIT:
          resp = await globalHandleService.GlobalUpdate(
            dispatch,
            TYPE_MASTER_ITEM_SKU,
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
      TYPE_MASTER_ITEM_SKU,
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
              {t("ManageMasterItemSku")}
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
                  label={t("item_sku_id")}
                  id="id"
                  value={masterData.id}
                  disabled={true}
                  autoFocus={false}
                  className={clsx(classes.margin, classes.textField)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t("item_sku_barcode")}
                  id="item_sku"
                  required={true}
                  value={masterData.item_sku}
                  disabled={true}
                  autoFocus={false}
                  inputProps={{ maxLength: 50 }}
                  onChange={(e) =>
                    setMasterData({
                      ...masterData,
                      item_sku: e.target.value,
                    })
                  }
                  className={clsx(classes.margin, classes.textField)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t("item_sku_code")}
                  id="item_code"
                  required={true}
                  value={masterData.item_code}
                  disabled={isMode === NEW ? false : true}
                  autoFocus={isMode === NEW ? true : false}
                  inputProps={{ maxLength: 30 }}
                  onChange={(e) =>
                    setMasterData({
                      ...masterData,
                      item_code: e.target.value,
                    })
                  }
                  className={clsx(classes.margin, classes.textField)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t("item_sku_name_thai")}
                  id="name_thai"
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
                  label={t("item_sku_name_eng")}
                  id="name_eng"
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
                <FormControl className={classes.formControl}>
                  <InputLabel id="select-color-open-select-label">
                    {t("item_sku_color_name")}
                  </InputLabel>
                  <Select
                    labelId="select-color-open-select-label"
                    id="select-color"
                    open={selectColor}
                    onClose={handleSelectColorClose}
                    onOpen={handleSelectColorOpen}
                    value={masterData.item_color}
                    disabled={isMode === REMOVE ? true : false}
                    onChange={(e) => {
                      setMasterData({
                        ...masterData,
                        item_color: e.target.value,
                        item_color_name: e._targetInst.memoizedProps.name,
                      });
                    }}
                  >
                    {ColorData.map((item, index) => (
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
                  <InputLabel id="select-size-open-select-label">
                    {t("item_sku_size_name")}
                  </InputLabel>
                  <Select
                    labelId="select-size-open-select-label"
                    id="select-size"
                    open={selectSize}
                    onClose={handleSelectSizeClose}
                    onOpen={handleSelectSizeOpen}
                    value={masterData.item_size}
                    disabled={isMode === REMOVE ? true : false}
                    onChange={(e) => {
                      setMasterData({
                        ...masterData,
                        item_size: e.target.value,
                        item_size_name: e._targetInst.memoizedProps.name,
                      });
                    }}
                  >
                    {SizeData.map((item, index) => (
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
                <TextField
                  label={t("item_sku_shelf_life")}
                  id="shelf_life"
                  required={true}
                  value={masterData.shelf_life}
                  disabled={isMode === REMOVE ? true : false}
                  autoFocus={isMode === NEW ? true : false}
                  inputProps={{ maxLength: 3 }}
                  onChange={(e) =>
                    setMasterData({
                      ...masterData,
                      shelf_life: e.target.value,
                    })
                  }
                  className={clsx(classes.margin, classes.textField)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t("item_sku_basic_unit_qty")}
                  id="basic_unit_qty"
                  required={true}
                  value={masterData.basic_unit_qty}
                  disabled={isMode === REMOVE ? true : false}
                  autoFocus={isMode === NEW ? true : false}
                  inputProps={{ maxLength: 30 }}
                  onChange={(e) =>
                    setMasterData({
                      ...masterData,
                      basic_unit_qty: e.target.value,
                    })
                  }
                  className={clsx(classes.margin, classes.textField)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="select-basic-unit-open-select-label">
                    {t("item_sku_basic_unit_code")}
                  </InputLabel>
                  <Select
                    labelId="select-basic-unit-open-select-label"
                    id="select-basic-unit"
                    open={selectBasicUnit}
                    onClose={handleSelectBasicUnitClose}
                    onOpen={handleSelectBasicUnitOpen}
                    value={masterData.basic_unit_code}
                    disabled={isMode === REMOVE ? true : false}
                    onChange={(e) => {
                      setMasterData({
                        ...masterData,
                        basic_unit_code: e.target.value,
                        basic_unit_name: e._targetInst.memoizedProps.name,
                      });
                    }}
                  >
                    {BasicUnitData.map((item, index) => (
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
                <TextField
                  label={t("item_sku_alternate_unit_qty")}
                  id="alternate_unit_qty"
                  required={true}
                  value={masterData.alternate_unit_qty}
                  disabled={isMode === DELETE ? true : false}
                  autoFocus={isMode === NEW ? true : false}
                  inputProps={{ maxLength: 30 }}
                  onChange={(e) =>
                    setMasterData({
                      ...masterData,
                      alternate_unit_qty: e.target.value,
                    })
                  }
                  className={clsx(classes.margin, classes.textField)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="select-alt-unit-open-select-label">
                    {t("item_sku_alternate_unit_code")}
                  </InputLabel>
                  <Select
                    labelId="select-alt-unit-open-select-label"
                    id="select-alt-unit"
                    open={selectAltUnit}
                    onClose={handleSelectAltUnitClose}
                    onOpen={handleSelectAltUnitOpen}
                    value={masterData.alternate_unit_code}
                    disabled={isMode === REMOVE ? true : false}
                    onChange={(e) => {
                      setMasterData({
                        ...masterData,
                        alternate_unit_code: e.target.value,
                        alternate_unit_name: e._targetInst.memoizedProps.name,
                      });
                    }}
                  >
                    {AltUnitData.map((item, index) => (
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
                  <InputLabel id="select-alt-factor-open-select-label">
                    {t("item_sku_alternate_factor")}
                  </InputLabel>
                  <Select
                    labelId="select-alt-factor-open-select-label"
                    id="select-alt-factor"
                    open={selectAltFactor}
                    onClose={handleSelectAltFactorClose}
                    onOpen={handleSelectAltFactorOpen}
                    value={masterData.alternate_factor}
                    disabled={isMode === REMOVE ? true : false}
                    onChange={(e) => {
                      setMasterData({
                        ...masterData,
                        alternate_factor: e.target.value,
                      });
                    }}
                  >
                    <MenuItem value={"M"}>Multiply</MenuItem>
                    <MenuItem value={"D"}>Divide</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="select-receive-type-open-select-label">
                    {t("item_sku_receive_unit_type")}
                  </InputLabel>
                  <Select
                    labelId="select-receive-type-open-select-label"
                    id="select-receive-type"
                    open={selectReceiveType}
                    onClose={handleSelectReceiveTypeClose}
                    onOpen={handleSelectReceiveTypeOpen}
                    value={masterData.receive_unit_type}
                    disabled={isMode === REMOVE ? true : false}
                    onChange={(e) => {
                      setMasterData({
                        ...masterData,
                        receive_unit_type: e.target.value,
                      });
                    }}
                  >
                    <MenuItem value={"B"}>Basic Unit</MenuItem>
                    <MenuItem value={"A"}>Alternate Unit</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="select-issue-type-open-select-label">
                    {t("item_sku_issue_unit_type")}
                  </InputLabel>
                  <Select
                    labelId="select-issue-type-open-select-label"
                    id="select-issue-type"
                    open={selectIssueType}
                    onClose={handleSelectIssueTypeClose}
                    onOpen={handleSelectIssueTypeOpen}
                    value={masterData.issue_unit_type}
                    disabled={isMode === REMOVE ? true : false}
                    onChange={(e) => {
                      setMasterData({
                        ...masterData,
                        issue_unit_type: e.target.value,
                      });
                    }}
                  >
                    <MenuItem value={"B"}>Basic Unit</MenuItem>
                    <MenuItem value={"A"}>Alternate Unit</MenuItem>
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

ManageMasterItemSku.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isMode: PropTypes.string.isRequired,
  isData: PropTypes.any.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
};

export default ManageMasterItemSku;
