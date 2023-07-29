import { useState, useEffect } from "react";
import { getProfile } from "../../queries/profile";
import { auth } from "../../firebase";

import ProfileHeader from "./ProfileHeader";
import Fields from "./Fields";

import "./profile.scss";

export default function Profile() {
    const [profileDetails, setDetails] = useState({});

    const handleSuccessProfileUpdate = (profileProps) => {
        setDetails((prev) => {
            return {
                ...prev,
                ...profileProps,
            };
        });
    };

    useEffect(() => {
        auth.onAuthStateChanged(() => {
            getProfile().then((response) => {
                setDetails(response);
            });
        });
    }, []);

    return (
        <div className="profileContainer">
            <ProfileHeader />
            <Fields
                profileDetails={profileDetails}
                onProfileUpdateSuccess={handleSuccessProfileUpdate}
            />
        </div>
    );
}
