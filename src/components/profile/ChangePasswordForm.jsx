import { useState } from "react";
import { useForm } from "react-hook-form";

import PasswordInput from "../input/PasswordInput";
import { auth } from "../../firebase";
import doesUserHavePassword from "../../utils/doesUserHavePassword";
import { setNewPasswordForUser } from "../../queries/auth";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

export default function ChangePasswordForm({ onClose, profileDetails }) {
    const [errorMessage, setErrorMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async ({ newPassword, currentPassword, repeatPassword }) => {
        if (currentPassword) {
            const credentials = EmailAuthProvider.credential(profileDetails.email, currentPassword);
            reauthenticateWithCredential(auth.currentUser, credentials)
                .then(async (res) => {
                    const response = await setNewPasswordForUser(auth.currentUser, newPassword);
                    if (response.error) {
                        setErrorMessage(response.message);
                    } else {
                        onClose();
                    }
                })
                .catch((error) => {
                    if (error.message.includes("auth/wrong-password")) {
                        setErrorMessage("Provided incorrect password");
                    }
                });
        } else {
            const response = await setNewPasswordForUser(auth.currentUser, newPassword);
            if (response.error) {
                setErrorMessage(response.message);
            } else {
                onClose();
            }
        }
    };

    const renderCurrentPassword = () => {
        const isPassword = doesUserHavePassword(auth);

        if (isPassword)
            return (
                <PasswordInput
                    placeholder="Current password"
                    name="Current pasword"
                    errors={errors?.currentPassword}
                    reg={register("currentPassword", {
                        required: {
                            value: true,
                            message: "Field is required",
                        },
                    })}
                />
            );
        else return null;
    };

    return (
        <form className="changePasswordForm" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="header">Change password</h1>
            {renderCurrentPassword()}
            <PasswordInput
                placeholder="New password"
                name="New pasword"
                errors={errors?.newPassword}
                reg={register("newPassword", {
                    required: {
                        value: true,
                        message: "Field is required",
                    },
                    pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                        message:
                            "Password should contain minimum 8 characters, at least 1 number and a special character",
                    },
                    validate: {
                        passwordNotEqual: (repeat, formValues) => {
                            return (
                                repeat !== formValues.currentPassword ||
                                "Password should not be the same as an old one"
                            );
                        },
                    },
                })}
            />
            <PasswordInput
                placeholder="Repeat new password"
                name="Password repeat"
                errors={errors?.repeatPassword}
                reg={register("repeatPassword", {
                    required: {
                        value: true,
                        message: "Field is required",
                    },
                    validate: {
                        passwordMatch: (repeat, formValues) => {
                            return repeat === formValues.newPassword || "Passwords should match";
                        },
                    },
                })}
            />

            <input type="submit" value="Change password" />
            {errorMessage ? <p className="errorMessage">{errorMessage}</p> : null}
        </form>
    );
}
