import { Link } from "react-router-dom";
import { ReactComponent as LogoutSVG } from "../../assets/Logout.svg";
import { links } from "../../utils/links";

import "./loginArea.scss";

export default function ProfileDropdown({ setDropdownVisibility, logout }) {
    const handleSignOut = () => {
        logout();
        setDropdownVisibility(false);
    };

    return (
        <div className="profileDropdown">
            {links.profileDropdownLinks.map((link) => (
                <Link key={link.src} to={link.src} onClick={() => setDropdownVisibility(false)}>
                    <img src={link.svg} />
                    {link.text}
                </Link>
            ))}
            <button className="profile-logout" onClick={handleSignOut}>
                <LogoutSVG />
                Logout
            </button>
        </div>
    );
}
