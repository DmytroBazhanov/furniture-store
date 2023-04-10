import { Link } from "react-router-dom";
import "./header.scss";
import SaleBadge from "../saleBadge/SaleBadge";
import DropdownMenu from "../dropdownMenu/DropdownMenu";
import Cart from "../cart/Cart";
import Notifications from "../Notifications/Notifications";
import LoginArea from "../loginArea/LoginArea";

export default function Header() {
    return (
        <header>
            <h1 className="logo">My-Furniture</h1>
            <nav>
                <Link to="/categories">Categories</Link>
                <Link to="/categories/bestSellers">Best Sellers</Link>
                <Link to="/FAQ">FAQs</Link>
            </nav>
            <div className="header-rightSide">
                <SaleBadge />
                <Cart />
                <Notifications />
                <LoginArea />
            </div>
        </header>
    );
}
