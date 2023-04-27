import { Link } from "react-router-dom";
import { ReactComponent as LogoutSVG } from "../../assets/Logout.svg";
import { ReactComponent as ProfileSVG } from "../../assets/profile.svg";
import { signOut } from "../../queries/auth";

import "./loginArea.scss";

export default function ProfileDropdown() {
    return (
        <div className="profileDropdown">
            <Link to="/profile">
                <ProfileSVG />
                Profile
            </Link>
            <button className="profile-logout" onClick={signOut}>
                <LogoutSVG />
                Logout
            </button>
        </div>
    );
}
