import { useRef } from "react";
import { AVATAR_ACCEPT } from "./config";

export default function Dashboard({ setAvatar, handleLocalAvatarChange }) {
    const inputRef = useRef(null);

    const onLocalAvatarChange = () => {
        const avatar = inputRef.current.files[0];
        handleLocalAvatarChange(setAvatar, avatar);
    };

    return (
        <div className="dashboard">
            <button className="changePassword">Change password</button>
            <label className="changeAvatar" onInput={onLocalAvatarChange}>
                Upload new avatar
                <input ref={inputRef} accept={AVATAR_ACCEPT} type="file" />
            </label>
        </div>
    );
}
