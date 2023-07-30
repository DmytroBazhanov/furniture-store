import { auth, db } from "../../firebase";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";

import FunctionalArea from "./FunctionalArea";
import DropdownMenu from "../dropdownMenu/DropdownMenu";
import UserAvatar from "./UserAvatar";
import LoginLinks from "./LoginLinks";
import ProfileDropdown from "./ProfileDropdown";

import "./loginArea.scss";

export default function LoginArea() {
    const [userInfo, setInfo] = useState(null);
    const [onLoadFlag, setFlag] = useState(false);
    const [isDropdownVisible, setVisibility] = useState(false);
    const [isAuthStateOnline, setAuthState] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setAuthState(true);
            }

            setFlag(true);
        });
    }, []);

    useEffect(() => {
        let unSubscribe = null;

        if (isAuthStateOnline) {
            const userID = auth.currentUser.uid;
            const profileRef = doc(db, import.meta.env.VITE_PROFILES, userID);

            unSubscribe = onSnapshot(profileRef, (profile) => {
                setInfo(profile.data());
            });
        }

        return () => {
            if (unSubscribe) unSubscribe();
        };
    }, [isAuthStateOnline]);

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
                dropdownContent={<ProfileDropdown setDropdownVisibility={setVisibility} />}
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
