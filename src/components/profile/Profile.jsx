import { useState, useEffect } from "react";
import { getProfile } from "../../queries/profile";
import { auth } from "../../firebase";
import { changeAvatar } from "../../queries/profile";

import ProfileHeader from "./ProfileHeader";
import Fields from "./Fields";

import "./profile.scss";

export default function Profile() {
    const [profileDetails, setDetails] = useState({});
    const [editedFields, setFields] = useState({});
    const [formState, setFormState] = useState("notTriggered");

    const handleSuccessProfileUpdate = async (profileProps) => {
        await handleAvatarChange();

        setDetails((prev) => {
            return {
                ...prev,
                ...profileProps,
            };
        });

        setFields({});
    };

    const handleLocalAvatarChange = (setAvatar, avatarFile) => {
        setAvatar(URL.createObjectURL(avatarFile));
        setFields((prev) => {
            return { ...prev, avatar: avatarFile };
        });
        setFormState("inProgress");
    };

    const handleAvatarChange = async () => {
        const avatar = editedFields.avatar;
        if (!avatar) return;

        await changeAvatar(avatar);
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
            <ProfileHeader
                avatar={profileDetails.avatar}
                handleLocalAvatarChange={handleLocalAvatarChange}
            />
            <Fields
                profileDetails={profileDetails}
                onProfileUpdateSuccess={handleSuccessProfileUpdate}
                editedFields={editedFields}
                setFields={setFields}
                formState={formState}
                setFormState={setFormState}
            />
        </div>
    );
}
