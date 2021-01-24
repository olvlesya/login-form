import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({ children, ...rest }) => {
  const user = useSelector((state) => state.user);

  return <Route {...rest}>{user ? children : <Redirect to="/login" />}</Route>;
};
