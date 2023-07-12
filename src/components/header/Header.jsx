import { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Hamburger } from "../../assets/Hamburger.svg";
import { links } from "../../utils/links";
import SaleBadge from "../saleBadge/SaleBadge";
import Cart from "../cart/Cart";
import Notifications from "../Notifications/Notifications";
import LoginArea from "../loginArea/LoginArea";
import ApplicationSidebar from "../applicationSidebar/ApplicationSidebar";

import "./header.scss";

export default function Header() {
    const [sidebarVisible, setVisibility] = useState(false);

    const salesBadgeMobile = <SaleBadge />; // for mobile layout

    return (
        <header>
            <ApplicationSidebar sidebarVisible={sidebarVisible} setVisibility={setVisibility} />
            <Hamburger className="hamburger" onClick={() => setVisibility(true)} />
            <h1 className="logo">My-Furniture</h1>
            <nav>
                {links.navigationLinks.map((link) => (
                    <Link key={link.src} to={link.src}>
                        {link.text}
                    </Link>
                ))}
            </nav>
            {salesBadgeMobile}
            <div className="header-rightSide">
                <SaleBadge />
                <Cart />
                <Notifications />
                <div className="header-loginArea">
                    <LoginArea />
                </div>
            </div>
        </header>
    );
}
