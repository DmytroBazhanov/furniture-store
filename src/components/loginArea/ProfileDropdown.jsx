import { Link } from "react-router-dom";
import { ReactComponent as LogoutSVG } from "../../assets/Logout.svg";
import { signOut } from "../../queries/auth";

import "./loginArea.scss";
import { links } from "../../utils/links";

export default function ProfileDropdown() {
    return (
        <div className="profileDropdown">
            {links.profileDropdownLinks.map((link) => (
                <Link to={link.src}>
                    <img src={link.svg} />
                    {link.text}
                </Link>
            ))}
            <button className="profile-logout" onClick={signOut}>
                <LogoutSVG />
                Logout
            </button>
        </div>
    );
}
