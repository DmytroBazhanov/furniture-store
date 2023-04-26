import { ReactComponent as Cross } from "../../assets/cross.svg";
import { sidebarLinks } from "./config";
import LoginArea from "../loginArea/LoginArea";

import "./sidebar.scss";
import { Link } from "react-router-dom";

export default function Sidebar() {
    const links = sidebarLinks.map((link) => {
        return (
            <Link key={link.href} className="sidebar-link" to={link.href}>
                <img src={link.svg} />
                {link.text}
            </Link>
        );
    });

    return (
        <div className="sidebar-background">
            <aside className="sidebar">
                <div className="sidebar-topPart">
                    <LoginArea />
                    <Cross className="sidebar-close" />
                </div>
                <div className="sidebar-linkContainer">{links}</div>
            </aside>
        </div>
    );
}
