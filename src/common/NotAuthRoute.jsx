import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export const NotAuthRoute = ({ children, ...rest }) => {
  const user = useSelector((state) => state.user);

  return <Route {...rest}>{user ? <Redirect to="/" /> : children}</Route>;
};
