import { ReactComponent as CornerSVG } from "../../assets/Corner.svg";

import "./emptyContainer.scss";

export default function EmptyContainerPlaceholder({ text }) {
    return (
        <div className="epmtyContainer">
            <CornerSVG className="topLeft" />
            <CornerSVG className="topRight" />
            {text}
            <CornerSVG className="bottomLeft" />
            <CornerSVG className="bottomRight" />
        </div>
    );
}
