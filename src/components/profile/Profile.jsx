import { useState, useEffect } from "react";
import { getProfile, getProfileFromCache } from "../../queries/profile";
import { auth } from "../../firebase";
import { changeAvatar } from "../../queries/profile";

import ProfileHeader from "./ProfileHeader";
import Fields from "./Fields";

import "./profile.scss";
import { syncQueuedRequests } from "../../utils/requestQueue";

export default function Profile() {
    const [profileDetails, setDetails] = useState({});
    const [editedFields, setFields] = useState({});
    const [formState, setFormState] = useState("notTriggered");

    const getProfileData = () => {
        syncQueuedRequests().then(() => {
            getProfile().then((response) => {
                setDetails(response);
            });
        });
    };

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
        window.addEventListener("online", getProfileData);

        auth.onAuthStateChanged((user) => {
            if (user && !navigator.onLine) {
                getProfileFromCache().then((result) => {
                    result.json().then((json) => {
                        setDetails(json);
                    });
                });
            } else {
                getProfileData();
            }
        });

        return () => {
            window.removeEventListener("online", getProfileData);
        };
    }, []);

    return (
        <div className="profileContainer">
            <ProfileHeader
                avatar={profileDetails?.avatar}
                profileDetails={profileDetails}
                handleLocalAvatarChange={handleLocalAvatarChange}
                setFormState={setFormState}
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
