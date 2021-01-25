import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({ children, ...rest }) => {
  const auth = useSelector((state) => state.auth);

  return <Route {...rest}>{auth ? children : <Redirect to="/login" />}</Route>;
};
