import { ReactComponent as NotificationsSVG } from "../../assets/Notifications.svg";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { getPurchasesForNotifications } from "../../queries/purchases";
import { onAuthStateChanged } from "firebase/auth";

import DropdownMenu from "../dropdownMenu/DropdownMenu";
import NotificationList from "./NotificationList";

import "./notifications.scss";

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [dropdownVisible, setDropdownVisibility] = useState(false);

    const handleNotificationRefresh = () => {
        getPurchasesForNotifications().then((result) => setNotifications(result));
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                handleNotificationRefresh();
                document.addEventListener("notificationsUpdated", handleNotificationRefresh);
                document.addEventListener("buyProduct", handleNotificationRefresh);
            }
        });

        return () => {
            document.removeEventListener("notificationsUpdated", handleNotificationRefresh);
            document.removeEventListener("buyProduct", handleNotificationRefresh);
        };
    }, []);

    return (
        <DropdownMenu
            dropdownContent={<NotificationList notifications={notifications} />}
            isVisible={dropdownVisible}
            setVisible={setDropdownVisibility}
            id="notificationDropdown"
        >
            <div className="notifications">
                {notifications.length > 0 ? <div className="notifications-alert"></div> : null}
                <NotificationsSVG />
            </div>
        </DropdownMenu>
    );
}
