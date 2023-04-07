import { useEffect } from "react";

export default function OutsideClick({ children, onOutsideClick }) {
    const handleClick = (e) => {
        const targetClass = e.currentTarget.className;

        const outsideClickContainer = e.target.closest(".outsideClick");
        if (!outsideClickContainer) onOutsideClick();
    };

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <div className="outsideClick" style={{ position: "static" }}>
            {children}
        </div>
    );
}
