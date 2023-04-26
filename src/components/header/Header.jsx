import { Link } from "react-router-dom";
import { ReactComponent as Hamburger } from "../../assets/Hamburger.svg";
import { useContext } from "react";
import SaleBadge from "../saleBadge/SaleBadge";
import Cart from "../cart/Cart";
import Notifications from "../Notifications/Notifications";
import LoginArea from "../loginArea/LoginArea";

import "./header.scss";
import { SidebarContext } from "../App";

export default function Header() {
    const { setVisibility } = useContext(SidebarContext);

    const salesBadgeMobile = <SaleBadge />; // for mobile layout

    return (
        <header>
            <Hamburger className="hamburger" onClick={() => setVisibility(true)} />
            <h1 className="logo">My-Furniture</h1>
            <nav>
                <Link to="/categories">Categories</Link>
                <Link to="/categories/bestSellers">Best Sellers</Link>
                <Link to="/FAQ">FAQs</Link>
            </nav>
            {salesBadgeMobile}
            <div className="header-rightSide">
                <SaleBadge />
                <Cart />
                <Notifications />
                <LoginArea />
            </div>
        </header>
    );
}
