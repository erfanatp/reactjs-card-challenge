import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import configureStore from "./store/configureStore";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

const store = configureStore(); // You can also pass in an

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
  , document.getElementById("root")
);
