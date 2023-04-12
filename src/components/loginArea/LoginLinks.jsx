import { useState } from "react";
import KeyDownCatcher from "../keyDownCatcher/KeyDownCatcher";
import Modal from "../modal/Modal";

import "./loginArea.scss";
import LoginForm from "../loginForm/LoginForm";

export default function LoginLinks() {
    const [modalShown, setModal] = useState(true);

    const handleClose = () => setModal(false);
    const handleCloseOnEscape = (e) => {
        if (e.key === "Escape") handleClose();
    };

    return (
        <div className="loginLinks">
            <button className="login">Login</button>
            <div className="separator"></div>
            <button className="register">Sign up</button>

            <Modal isVisible={modalShown} onClose={handleClose}>
                <KeyDownCatcher onCatch={handleCloseOnEscape}>
                    <LoginForm />
                </KeyDownCatcher>
            </Modal>
        </div>
    );
}
