import React from "react";
import { useTranslation } from "react-i18next";
import Box from "@material-ui/core/Box";

export default () => {
  const { t } = useTranslation();
  return (
    <div style={{ width: "100%" }}>
      <Box component="div" display="flex" justifyContent="center">
        <h1>404</h1>
      </Box>
      <Box component="div" display="flex" justifyContent="center">
        {t('std_msg_result_404')}
      </Box>
    </div>
  );
};
