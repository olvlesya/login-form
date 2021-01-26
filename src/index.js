import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import * as axios from "axios";
import { authReducer } from "./store/auth/reducer";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch {
    // ignore write errors
  }
};

const store = createStore(
  combineReducers({
    auth: authReducer,
  }),
  loadState(),
  composeWithDevTools()
);
store.subscribe(() => saveState(store.getState()));

axios.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if (auth) {
    req.headers["Authorization"] = `Bearer ${auth.access}`;
  }
  return req;
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
