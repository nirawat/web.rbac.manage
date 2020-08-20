import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Grid, Divider, Typography } from "@material-ui/core";
import MaterialTable, { MTableToolbar } from "material-table";
import ManageUser from "./manage.user";
import Skeleton from "@material-ui/lab/Skeleton";
import useWindowDimensions from "../../utility/useWindowsDimensions";
import * as globalHandleService from "../../../services/global.handle.service";
import {
  TYPE_USER,
  NEW,
  EDIT,
  REMOVE,
} from "../../../redux/reducers/global.action.type.jsx";

export default () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();
  const isLoadingData = useSelector(
    (state) => state.globalLoading.isLoadingData
  );
  const skeletonData = useSelector((state) => state.globalLoading.isSkeleton);
  const initialData = useSelector((state) => state.reducerUser.model);
  const [isOpenNewDialog, setIsOpenNewDialog] = React.useState({
    isShow: false,
    isMode: NEW,
    isData: {},
  });
  const masterItems = useSelector((state) => state.reducerUser.data);

  const heightScale =
    height <= 414
      ? height - 287
      : height <= 736
      ? height - 279
      : height <= 768
      ? height - 285
      : height - 285;

  const [configTable] = React.useState({
    options: {
      showTitle: false,
      search: true,
      pageSize: 10,
      actionsColumnIndex: -1,
      minBodyHeight: heightScale,
      maxBodyHeight: heightScale,
      searchFieldAlignment: "left",
      searchFieldStyle: {
        width: width <= 414 ? width - 210 : "",
      },
    },
    components: {
      Toolbar: (props) => (
        <>
          <MTableToolbar {...props} />
          <Divider />
        </>
      ),
    },
    actions: [
      {
        icon: "refresh",
        onClick: (event) => {
          asyncData();
        },
        isFreeAction: true,
        tooltip: t("global_button_refresh"),
      },
      {
        icon: "add",
        onClick: (event) => {
          handleOpenDialogEvent(NEW, initialData);
        },
        isFreeAction: true,
        tooltip: t("global_button_new"),
      },
      {
        icon: "edit",
        tooltip: t("global_button_edit"),
        onClick: (event, rowData) => {
          handleOpenDialogEvent(EDIT, rowData);
        },
      },
      {
        icon: "delete",
        tooltip: t("global_button_delete"),
        onClick: (event, rowData) => {
          handleOpenDialogEvent(REMOVE, rowData);
        },
      },
    ],
    tbColumns: [
      // {
      //   title: t("user_image"),
      //   render: () => <Avatar />,
      //   width: 30,
      // },
      {
        title: t("user_email"),
        field: "email",
        width: 250,
      },
      {
        title: t("user_prefixes"),
        field: "prefixes",
        width: 50,
      },
      {
        title: t("user_first_name"),
        field: "first_name",
        width: 250,
      },
      {
        title: t("user_last_name"),
        field: "last_name",
        width: 250,
      },
      {
        title: t("user_language"),
        field: "language",
        width: 80,
      },
      {
        title: t("user_section"),
        field: "section_name",
        width: 130,
      },
      {
        title: t("user_activate_date"),
        field: "activate_date",
        render: (row) => (
          <span>
            {row["activate_date"] === "1999-01-01T00:00:00"
              ? ""
              : new Date(row["activate_date"]).toLocaleDateString("en-GB")}
          </span>
        ),
        width: 150,
      },
    ],
  });

  function asyncData() {
    (async () => {
      await globalHandleService.GlobalRequest(dispatch, TYPE_USER);
    })();
  }

  useEffect(
    () => {
      asyncData();
    },
    // eslint-disable-next-line
    []
  );

  const handleOpenDialogEvent = (isMode, data) => {
    setIsOpenNewDialog({
      ...isOpenNewDialog,
      isShow: true,
      isMode: isMode,
      isData: data,
    });
  };

  const handleCloseDialogEvent = (data) => {
    setIsOpenNewDialog({
      ...isOpenNewDialog,
      isShow: false,
    });
  };

  return (
    <div className="container">
      <Grid container spacing={0}>
        <Grid item xs={12}>
          {isLoadingData ? (
            skeletonData.map((variant, index) => (
              <Typography
                component="div"
                key={index.toString()}
                variant={variant}
              >
                <Skeleton key={index.toString()} />
              </Typography>
            ))
          ) : (
            <>
              <Divider />
              <MaterialTable
                components={configTable.components}
                options={configTable.options}
                actions={configTable.actions}
                columns={configTable.tbColumns}
                data={masterItems}
              />
            </>
          )}
          <ManageUser
            isOpen={isOpenNewDialog.isShow}
            isMode={isOpenNewDialog.isMode}
            isData={isOpenNewDialog.isData}
            handleCloseDialog={handleCloseDialogEvent}
          />
        </Grid>
      </Grid>
    </div>
  );
};
