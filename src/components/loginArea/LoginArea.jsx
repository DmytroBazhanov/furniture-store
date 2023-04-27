import FunctionalArea from "./FunctionalArea";
import DropdownMenu from "../dropdownMenu/DropdownMenu";
import UserAvatar from "./UserAvatar";
import LoginLinks from "./LoginLinks";
import { auth } from "../../firebase";
import { useEffect, useState } from "react";
import { getProfile } from "../../queries/profile";

import "./loginArea.scss";
import ProfileDropdown from "./ProfileDropdown";

export default function LoginArea() {
    const [userInfo, setInfo] = useState(null);
    const [onLoadFlag, setFlag] = useState(false);
    const [isDropdownVisible, setVisibility] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                getProfile().then((profile) => setInfo(profile));
            } else {
                setInfo(null);
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

    if (userInfo)
        return (
            <DropdownMenu
                dropdownContent={<ProfileDropdown />}
                isVisible={isDropdownVisible}
                setVisible={setVisibility}
                id="userDropdown"
            >
                <div className="loginArea">
                    <UserAvatar src={userInfo?.avatar} />
                    {renderFunctionalArea()}
                </div>
            </DropdownMenu>
        );
    else
        return (
            <div className="loginArea">
                <UserAvatar src={userInfo?.avatar} />
                {renderFunctionalArea()}
            </div>
        );
}
