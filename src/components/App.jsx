import React, { createContext, useState } from "react";
import Header from "./header/Header.jsx";
import Sidebar from "./sidebar/Sidebar.jsx";

import { Outlet } from "react-router-dom";
import BreadCrumbs from "./breadCrumbs/BreadCrumbs.jsx";

export const SidebarContext = createContext({
    visible: false,
    setVisibility: () => {},
});

function App() {
    const [sidebarVisible, setVisibility] = useState(false);

    const contextObj = {
        visible: sidebarVisible,
        setVisibility: setVisibility,
    };

    return (
        <div className="App">
            <SidebarContext.Provider value={contextObj}>
                <Header />
                <Sidebar />
                <main>
                    <BreadCrumbs />
                    <Outlet />
                </main>
            </SidebarContext.Provider>
        </div>
    );
}

export default App;
