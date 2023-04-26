import React, { createContext, useState } from "react";
import Header from "./header/Header.jsx";
import Sidebar from "./sidebar/Sidebar.jsx";

import { Outlet } from "react-router-dom";

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
                <Outlet />
            </SidebarContext.Provider>
        </div>
    );
}

export default App;
