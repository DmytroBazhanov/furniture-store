import { notificationUpdatedEvent } from "./config";
import { hideNotification } from "../../queries/purchases";
import { ReactComponent as CrossSVG } from "../../assets/cross.svg";
import Tooltip from "../tooltip/Tooltip";

import "./notifications.scss";

export default function NotificationItem({ data }) {
    const date = new Date(data.date.seconds * 1000).toDateString();

    const handleHideClick = (e) => {
        hideNotification(data.id);
        e.target.dispatchEvent(notificationUpdatedEvent);
    };

    return (
        <li className="notificationItem">
            <CrossSVG className="hideNotification" onClick={handleHideClick} />
            <img src={data.imageURL} alt="product" />
            <div className="mainBlock-info">
                <div className="topLane">
                    <Tooltip text={data.productName} disableIfToSmall={true}>
                        <p className="productName">{data.productName}</p>
                    </Tooltip>
                </div>
                <p className="bottomLine">
                    ${data.operationPrice} <span className="date">{date}</span>
                </p>
            </div>
        </li>
    );
}
