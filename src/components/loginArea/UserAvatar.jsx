import { ReactComponent as Avatar } from "../../assets/User.svg";

import "./loginArea.scss";

export default function UserAvatar({ src }) {
    if (src) {
        return <img src={src} className="userAvatar" alt="User avatar" />;
    }

    return <Avatar />;
}
