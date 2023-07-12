import React, { createContext, useState } from "react";
import Header from "./header/Header.jsx";
import BreadCrumbs from "./breadCrumbs/BreadCrumbs.jsx";

import { Outlet } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Header />
            <main>
                <BreadCrumbs />
                <Outlet />
            </main>
        </div>
    );
}

export default App;
