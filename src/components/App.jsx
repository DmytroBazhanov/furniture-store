import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/Header.jsx";

function App() {
    return (
        <div className="App">
            <Header />
            <React.StrictMode>
                <Outlet />
            </React.StrictMode>
        </div>
    );
}

export default App;
