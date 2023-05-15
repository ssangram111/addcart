import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./context/AuthProvider";
import { Context } from "./context/Contex";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <Context>
        <App />
      </Context>
    </BrowserRouter>
  </AuthProvider>
);
