import EmptyContainerPlaceholder from "../emptyContainerPlaceholder/EmptyContainerPlaceholder";
import NotificationItem from "./NotificationItem";
import "./notifications.scss";

export default function NotificationList({ notifications }) {
    if (notifications.length === 0) {
        return <EmptyContainerPlaceholder text="No new messages" />;
    }

    return (
        <ul className="notificationList">
            {notifications.map((notification) => (
                <NotificationItem key={notification.id} data={notification} />
            ))}
        </ul>
    );
}
