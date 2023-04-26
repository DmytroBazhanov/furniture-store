import { ReactComponent as Cross } from "../../assets/cross.svg";
import { sidebarLinks } from "./config";
import { ReactComponent as LogoutSVG } from "../../assets/Logout.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { SidebarContext } from "../App";
import { signOut } from "../../queries/auth";
import LoginArea from "../loginArea/LoginArea";

import "./sidebar.scss";

export default function Sidebar() {
    const { setVisibility, visible } = useContext(SidebarContext);

    const links = sidebarLinks.map((link) => {
        return (
            <Link key={link.href} className="sidebar-link" to={link.href}>
                <img src={link.svg} />
                {link.text}
            </Link>
        );
    });

    const visibilityClass = visible ? "visible" : "hidden";

    return (
        <div className={`sidebar-background ${visibilityClass}`}>
            <aside className={`sidebar ${visibilityClass}`}>
                <div className="sidebar-topPart">
                    <LoginArea />
                    <Cross className="sidebar-close" onClick={() => setVisibility(false)} />
                </div>
                <div className="sidebar-linkContainer">{links}</div>
                <button className="sidebar-logout" onClick={signOut}>
                    <LogoutSVG />
                    Logout
                </button>
            </aside>
        </div>
    );
}
