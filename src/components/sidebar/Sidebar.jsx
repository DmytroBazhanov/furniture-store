import { useState, useEffect } from "react";
import { ReactComponent as Cross } from "../../assets/cross.svg";
import { DEFAULT_ANIMATION_TIMING } from "./config.js";

import "./sidebar.scss";

export default function Sidebar({ headerContent, mainContent, setVisibility, visible }) {
    // Blur in combination with element transition cause lags
    const [isBackgroundActive, setBackground] = useState(false);
    const [timerID, setTimerID] = useState(null);

    // Setting it after the main animation ended boost performance and removes lagging animation
    const handleBackgroundChange = () => {
        const timer = setTimeout(() => {
            setBackground(true);
        }, DEFAULT_ANIMATION_TIMING);

        setTimerID(timer);
    };

    useEffect(() => {
        if (visible) {
            handleBackgroundChange();
        } else if (!visible) {
            clearTimeout(timerID);
            setBackground(false);
        }

        return () => {
            clearTimeout(timerID);
        };
    }, [visible]);

    const visibilityClass = visible ? "visible" : "hidden";
    const backgroundClass = isBackgroundActive ? visibilityClass : "hidden";

    return (
        <div className={`sidebar-background ${backgroundClass}`}>
            <aside className={`sidebar ${visibilityClass}`}>
                <div className="sidebar-topPart">
                    {headerContent}
                    <Cross className="sidebar-close" onClick={() => setVisibility(false)} />
                </div>
                {mainContent}
            </aside>
        </div>
    );
}
