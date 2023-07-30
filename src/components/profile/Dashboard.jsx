import { useRef, useState } from "react";
import { AVATAR_ACCEPT } from "./config";

import Modal from "../modal/Modal";
import KeyDownCatcher from "../keyDownCatcher/KeyDownCatcher";
import ChangePasswordForm from "./ChangePasswordForm";

export default function Dashboard({ setAvatar, handleLocalAvatarChange }) {
    const [isVisible, setVisibility] = useState(false);

    const onOpen = (e) => {
        e.stopPropagation();
        setVisibility(true);
    };

    const onClose = () => setVisibility(false);
    const onEscape = (e) => {
        if (e.key === "Escape") onClose();
    };

    const inputRef = useRef(null);

    const onLocalAvatarChange = () => {
        const avatar = inputRef.current.files[0];
        handleLocalAvatarChange(setAvatar, avatar);
    };

    return (
        <div className="dashboard">
            <button className="changePassword" onClick={onOpen}>
                Change password
            </button>
            <label className="changeAvatar" onInput={onLocalAvatarChange}>
                Upload new avatar
                <input ref={inputRef} accept={AVATAR_ACCEPT} type="file" />
            </label>
            <Modal isVisible={isVisible} onClose={onClose}>
                <KeyDownCatcher onCatch={onEscape}>
                    <ChangePasswordForm />
                </KeyDownCatcher>
            </Modal>
        </div>
    );
}
