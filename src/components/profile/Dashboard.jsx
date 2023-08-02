import { useEffect, useRef, useState } from "react";
import { AVATAR_ACCEPT } from "./config";

import Modal from "../modal/Modal";
import KeyDownCatcher from "../keyDownCatcher/KeyDownCatcher";
import ChangePasswordForm from "./ChangePasswordForm";

export default function Dashboard({
    setAvatar,
    handleLocalAvatarChange,
    setFormState,
    profileDetails,
}) {
    const [isVisible, setVisibility] = useState(false);
    const [timerID, setTimerID] = useState(null);

    const onOpen = (e) => {
        e.stopPropagation();
        setVisibility(true);
    };

    const onClose = () => setVisibility(false);

    const onEscape = (e) => {
        if (e.key === "Escape") onClose();
    };

    const handlePasswordChange = () => {
        setFormState("saveSuccess");
        onClose();

        const timer = setTimeout(() => {
            setFormState("notTriggered");
        }, 2000);
        setTimerID(timer);
    };

    const inputRef = useRef(null);

    const onLocalAvatarChange = () => {
        const avatar = inputRef.current.files[0];
        handleLocalAvatarChange(setAvatar, avatar);
    };

    useEffect(() => {
        return () => {
            clearTimeout(timerID);
        };
    }, []);

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
                    <ChangePasswordForm
                        onClose={handlePasswordChange}
                        profileDetails={profileDetails}
                    />
                </KeyDownCatcher>
            </Modal>
        </div>
    );
}
