import FunctionalArea from "./FunctionalArea";
import UserAvatar from "./UserAvatar";
import LoginLinks from "./LoginLinks";
import { auth } from "../../firebase";
import { useEffect, useState } from "react";
import { getProfile } from "../../queries/profile";

import "./loginArea.scss";

export default function LoginArea() {
    const [userInfo, setInfo] = useState(null);
    const [onLoadFlag, setFlag] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                getProfile().then((profile) => setInfo(profile));
            }

            setFlag(true);
        });
    }, []);

    const renderFunctionalArea = () => {
        if (!onLoadFlag) return <p>Loading...</p>;

        if (!userInfo) {
            return <LoginLinks />;
        }

        if (userInfo.name || userInfo.lastname) {
            return <FunctionalArea fullname={`${userInfo?.name} ${userInfo?.lastname}`} />;
        } else return <FunctionalArea fullname={userInfo.email} />;
    };

    return (
        <div className="loginArea">
            <UserAvatar src={userInfo?.avatar} />
            {renderFunctionalArea()}
        </div>
    );
}
