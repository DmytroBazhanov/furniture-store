import { useState, useEffect } from "react";
import { getProfile } from "../../queries/profile";

import "./profile.scss";
import ProfileHeader from "./ProfileHeader";
import Fields from "./Fields";

export default function Profile() {
    const [profileDetails, setDetails] = useState({});
    const [fieldsInEditing, setFields] = useState([]);

    return (
        <div className="profileContainer">
            <ProfileHeader />
            <Fields profileDetails={profileDetails} setFields={setFields} />
        </div>
    );
}
