import React from "react";
import ReactDOM from "react-dom/client";
import "./globalStyles/main.scss";

import RouterProvider from "./components/RouterProvider/RouterProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider />
    </React.StrictMode>
);
