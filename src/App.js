import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { Details } from "./pages/Details";
import { PrivateRoute } from "./common/PrivateRoute";
import { NotAuthRoute } from "./common/NotAuthRoute";
import "antd/dist/antd.css";
import { content } from "./App.module.scss";

function App() {
  return (
    <BrowserRouter>
      <div className={content}>
        <Switch>
          <NotAuthRoute path="/login">
            <SignIn />
          </NotAuthRoute>
          <NotAuthRoute path="/signup">
            <SignUp />
          </NotAuthRoute>
          <PrivateRoute path="/">
            <Details />
          </PrivateRoute>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
