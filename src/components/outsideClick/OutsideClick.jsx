import { useEffect } from "react";

export default function OutsideClick({ children, onOutsideClick, id }) {
    const handleClick = (e) => {
        const outsideClickContainer = e.target.closest(".outsideClick");
        if (!outsideClickContainer || outsideClickContainer.id !== id) onOutsideClick();
    };

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <div className="outsideClick" id={id} style={{ position: "static" }}>
            {children}
        </div>
    );
}
