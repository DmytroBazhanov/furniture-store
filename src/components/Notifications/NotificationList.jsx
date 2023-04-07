import NotificationItem from "./NotificationItem";
import "./notifications.scss";

export default function NotificationList({ notifications }) {
    return (
        <ul className="notificationList">
            {notifications.map((notification) => (
                <NotificationItem key={notification.id} data={notification} />
            ))}
        </ul>
    );
}
