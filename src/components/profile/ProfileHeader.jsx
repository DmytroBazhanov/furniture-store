import { useState } from "react";
import { ReactComponent as UserSVG } from "../../assets/User.svg";

import UserAvatar from "../loginArea/UserAvatar";
import Dashboard from "./Dashboard";

export default function ProfileHeader({
    avatar,
    handleLocalAvatarChange,
    setFormState,
    profileDetails,
}) {
    const [avatarSrc, setAvatar] = useState("");

    return (
        <div className="profileHeader">
            <div className="avatarContainer">
                <UserAvatar src={avatarSrc ? avatarSrc : avatar} />
            </div>
            <Dashboard
                setAvatar={setAvatar}
                profileDetails={profileDetails}
                handleLocalAvatarChange={handleLocalAvatarChange}
                setFormState={setFormState}
            />
        </div>
    );
}
