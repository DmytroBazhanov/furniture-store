import { useState } from "react";
import KeyDownCatcher from "../keyDownCatcher/KeyDownCatcher";
import Modal from "../modal/Modal";

import "./loginArea.scss";
import LoginForm from "../loginForm/LoginForm";
import RegisterForm from "../registerForm/RegisterForm";

export default function LoginLinks() {
    const [modalShown, setModal] = useState(false);
    const [currentForm, setForm] = useState("login");

    const handleShow = (e) => {
        const formID = e.target.id;

        if (formID === "login") setForm("login");
        else if (formID === "registration") setForm("registration");

        e.stopPropagation();
        setModal(true);
    };
    const handleClose = () => {
        setModal(false);
    };
    const handleCloseOnEscape = (e) => {
        if (e.key === "Escape") handleClose();
    };

    return (
        <div className="loginLinks">
            <button className="login" id="login" onClick={handleShow}>
                Login
            </button>
            <div className="separator"></div>
            <button className="register" id="registration" onClick={handleShow}>
                Sign up
            </button>

            <Modal isVisible={modalShown} onClose={handleClose}>
                <KeyDownCatcher onCatch={handleCloseOnEscape}>
                    {currentForm === "login" ? <LoginForm /> : <RegisterForm />}
                </KeyDownCatcher>
            </Modal>
        </div>
    );
}
