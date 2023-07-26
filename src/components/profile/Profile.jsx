import { useState, useEffect } from "react";
import { getProfile } from "../../queries/profile";

import "./profile.scss";
import ProfileHeader from "./ProfileHeader";

export default function Profile() {
    const [profileDetails, setDetails] = useState({});

    return (
        <div className="profileContainer">
            <ProfileHeader />
        </div>
    );
}
