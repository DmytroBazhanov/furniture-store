import { auth, db } from "../../firebase";
import { useEffect, useRef, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { signOut } from "../../queries/auth";
import { getProfile } from "../../queries/profile";

import FunctionalArea from "./FunctionalArea";
import DropdownMenu from "../dropdownMenu/DropdownMenu";
import UserAvatar from "./UserAvatar";
import LoginLinks from "./LoginLinks";
import ProfileDropdown from "./ProfileDropdown";

import "./loginArea.scss";
import { cacheInfo } from "../../utils/cacheInfo";

export default function LoginArea() {
    const [userInfo, setInfo] = useState(null);
    const [onLoadFlag, setFlag] = useState(false);
    const [isDropdownVisible, setVisibility] = useState(false);
    const [isAuthStateOnline, setAuthState] = useState(false);

    const listenerRef = useRef(null);

    const getUserCachedUserData = async () => {
        const requestObject = new Request("userProfile");

        fetch(requestObject).then((response) => {
            response.json().then((userInfo) => {
                const { email, name, lastname, avatar, purchaseHistory } = userInfo;

                setInfo({
                    email,
                    avatar,
                    name,
                    lastname,
                    purchaseHistory,
                });
            });
        });
    };

    const handleLogout = async () => {
        await listenerRef.current();
        setAuthState(false);
        setInfo(null);
        signOut();
    };

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
        if (isAuthStateOnline && !navigator.onLine) {
            getUserCachedUserData();
        } else if (isAuthStateOnline) {
            const userID = auth.currentUser.uid;
            const profileRef = doc(db, import.meta.env.VITE_PROFILES, userID);
            unSubscribe = onSnapshot(profileRef, async (profile) => {
                setInfo({
                    ...profile.data(),
                });
            });

            listenerRef.current = unSubscribe;

            // for caching purposes only
            getProfile().then((response) => {
                const requestObject = new Request("userProfile");

                const responseObject = new Response(JSON.stringify(response), {
                    status: 200,
                    statusText: "Ok",
                });

                cacheInfo(requestObject, responseObject);
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
                dropdownContent={
                    <ProfileDropdown setDropdownVisibility={setVisibility} logout={handleLogout} />
                }
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
