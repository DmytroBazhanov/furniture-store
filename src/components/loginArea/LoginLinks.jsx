import { useState } from "react";
import Modal from "../modal/Modal";

import "./loginArea.scss";
import LoginForm from "../loginForm/LoginForm";

export default function LoginLinks() {
    const [modalShown, setModal] = useState(true);

    const handleClose = () => setModal(false);

    return (
        <div className="loginLinks">
            <button className="login">Login</button>
            <div className="separator"></div>
            <button className="register">Sign up</button>

            <Modal isVisible={modalShown} onClose={handleClose}>
                <LoginForm />
            </Modal>
        </div>
    );
}
