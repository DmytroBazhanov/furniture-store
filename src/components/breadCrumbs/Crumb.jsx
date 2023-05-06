import { Link } from "react-router-dom";

import "./breadCrumbs.scss";

export default function Crumb({ children, href }) {
    return (
        <Link className="crumb" to={href}>
            {children.replace(/%20/g, " ")}
        </Link>
    );
}
