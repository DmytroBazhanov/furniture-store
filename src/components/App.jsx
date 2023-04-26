import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/Header.jsx";
import Sidebar from "./sidebar/Sidebar.jsx";

function App() {
    return (
        <div className="App">
            <Header />
            <Sidebar />
            <Outlet />
        </div>
    );
}

export default App;
