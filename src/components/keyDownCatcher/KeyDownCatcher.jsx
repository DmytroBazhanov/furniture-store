import { useEffect } from "react";

export default function KeyDownCatcher({ onCatch, children }) {
    useEffect(() => {
        document.addEventListener("keydown", onCatch);

        return () => {
            document.removeEventListener("keydown", onCatch);
        };
    }, []);

    return <div className="keyDownCatcher">{children}</div>;
}
