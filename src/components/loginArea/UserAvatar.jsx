import { ReactComponent as Avatar } from "../../assets/User.svg";
import { ReactComponent as NoConnection } from "../../assets/noConnection.svg";

import "./loginArea.scss";

export default function UserAvatar({ src }) {
    if (!navigator.onLine) return <NoConnection className="noConnection" />;

    if (src) {
        return <img src={src} className="userAvatar" alt="User avatar" />;
    }

    return <Avatar />;
}
