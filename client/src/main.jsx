import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AppProviderContext } from "./context/AppContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <BrowserRouter>
         <AppProviderContext>
            <App />
         </AppProviderContext>
      </BrowserRouter>
   </React.StrictMode>
);
