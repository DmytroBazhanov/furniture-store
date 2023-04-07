import KeyDownCatcher from "../keyDownCatcher/KeyDownCatcher";
import OutsideClick from "../outsideClick/OutsideClick.jsx";

import "./dropdownMenu.scss";

export default function DropdownMenu({ children, dropdownContent, isVisible, setVisible }) {
    const handleMenuTogle = () => {
        setVisible((prev) => !prev);
    };

    const handleEscape = (event) => {
        if (event.key !== "Escape") return;
        setVisible(false);
    };

    const handleOutsideClick = () => setVisible(false);

    return (
        <div className="DropdownWrapper">
            <OutsideClick onOutsideClick={handleOutsideClick}>
                <div className="Dropdown-PreviewElement" onClick={handleMenuTogle}>
                    {children}
                </div>
                {isVisible ? (
                    <div className="DropdownMenu">
                        <KeyDownCatcher onCatch={handleEscape}>{dropdownContent}</KeyDownCatcher>
                    </div>
                ) : null}
            </OutsideClick>
        </div>
    );
}
