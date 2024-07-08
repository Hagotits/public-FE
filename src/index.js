import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <React.StrictMode> */}
        {/* 개발 환경에서는 끄지만 배포 환경에서는 키는게 좋다. */}
        <App />
        {/* </React.StrictMode> */}
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
reportWebVitals();
