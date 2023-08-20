import React, { createContext, useState, useEffect } from "react";
import Header from "./header/Header.jsx";
import BreadCrumbs from "./breadCrumbs/BreadCrumbs.jsx";

import { Outlet } from "react-router-dom";
import { duplicateFbaseKeyToRealDb, createFbaseBackupKey } from "../utils/indexedDb.js";

function App() {
    const handleOnline = () => {
        duplicateFbaseKeyToRealDb();
    };

    const handleOffline = () => {
        createFbaseBackupKey();
    };

    useEffect(() => {
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

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
