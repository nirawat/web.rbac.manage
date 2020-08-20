import { Redirect, Route } from "react-router-dom";
import React from "react";
import { isAuthenticated } from "./auth";
export const PrivateRoute = (route) => {
  return isAuthenticated() ? (
    <Route
      path={route.path}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  ) : (
    <Redirect to="/" />
  );
};
