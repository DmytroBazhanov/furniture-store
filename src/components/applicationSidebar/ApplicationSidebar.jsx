import { links } from "../../utils/links";
import { ReactComponent as LogoutSVG } from "../../assets/Logout.svg";
import { Link } from "react-router-dom";
import { signOut } from "../../queries/auth";

import LoginArea from "../loginArea/LoginArea";
import Sidebar from "../sidebar/Sidebar";

export default function ApplicationSidebar({ sidebarVisible, setVisibility }) {
    const handleSignOut = () => {
        setVisibility(false);
        signOut();
    };

    const sidebarLinks = links.navigationLinks.map((link) => {
        return (
            <Link
                key={link.src}
                className="sidebar-link"
                to={link.src}
                onClick={() => setVisibility(false)}
            >
                <img className="sidebar-svg" src={link.svg} />
                {link.text}
            </Link>
        );
    });

    return (
        <>
            <Sidebar
                setVisibility={setVisibility}
                visible={sidebarVisible}
                headerContent={<LoginArea />}
                mainContent={
                    <>
                        <div className="sidebar-linkContainer">{sidebarLinks}</div>
                        <button className="sidebar-logout" onClick={handleSignOut}>
                            <LogoutSVG />
                            Logout
                        </button>
                    </>
                }
            />
        </>
    );
}
