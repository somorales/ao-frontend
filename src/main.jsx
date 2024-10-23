import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { AuthWrapper } from "./context/auth.context.jsx";
import { ToastWrapper } from "./context/toast.context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthWrapper>
    <ToastWrapper>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToastWrapper>
  </AuthWrapper>
);
