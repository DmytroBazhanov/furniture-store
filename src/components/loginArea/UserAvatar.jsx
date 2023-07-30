import { useEffect, useState } from "react";
import { ReactComponent as Avatar } from "../../assets/User.svg";
import { getAvatarURL } from "../../queries/profile";

import "./loginArea.scss";
import { auth } from "../../firebase";

export default function UserAvatar({ src }) {
    const [avatarURL, setAvatar] = useState("");

    const getAvatarUrl = async () => {
        const avatar = await getAvatarURL(src);
        setAvatar(avatar);
    };

    useEffect(() => {
        auth.onAuthStateChanged(() => {
            getAvatarUrl();
        });
    }, []);

    if (avatarURL) {
        return <img src={avatarURL} className="userAvatar" alt="User avatar" />;
    }

    return <Avatar />;
}
