import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/Header.jsx";

function App() {
    return (
        <div className="App">
            <Header />
            <Outlet />
        </div>
    );
}

export default App;
