import { Redirect, Route } from "react-router-dom";
import React from "react";
import { isAuthenticated, isAuthenticatedConfig } from "./auth";
export const PublicRoute = (route) => {
  return !isAuthenticated() ? (
    <Route
      path={route.path}
      render={(props) => <route.component {...props} />}
    />
  ) : !isAuthenticatedConfig() ? (
    <Redirect to="/home" />
  ) : (
    <Redirect to="/auth/dashboard" />
  );
};
