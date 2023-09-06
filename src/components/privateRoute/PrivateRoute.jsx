import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
    const [isUserSigned, setUserAuthFlag] = useState(false);
    const [isFirstLoad, setLoadFlag] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) setUserAuthFlag(true);
            else navigate("/");
        });

        setLoadFlag(false);
    }, []);

    if (isFirstLoad || !isUserSigned) return <></>;
    return <>{children}</>;
}
