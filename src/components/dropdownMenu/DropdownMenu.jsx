import KeyDownCatcher from "../keyDownCatcher/KeyDownCatcher";
import "./dropdownMenu.scss";
import { useState } from "react";

export default function DropdownMenu({ children, dropdownContent, isVisible, setVisible }) {
    const handleMenuTogle = () => {
        setVisible((prev) => !prev);
    };

    const handleEscape = (event) => {
        if (event.key !== "Escape") return;
        setVisible(false);
    };

    return (
        <div className="DropdownWrapper">
            <div className="Dropdown-PreviewElement" onClick={handleMenuTogle}>
                {children}
            </div>
            {isVisible ? (
                <div className="DropdownMenu">
                    <KeyDownCatcher onCatch={handleEscape}>{dropdownContent}</KeyDownCatcher>
                </div>
            ) : null}
        </div>
    );
}
