import { useState } from "react";
import { useForm } from "react-hook-form";

import PasswordInput from "../input/PasswordInput";
import { auth } from "../../firebase";

export default function ChangePasswordForm() {
    const [errorMessage, setErrorMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = ({ currentPassword, newPassword, repeatPassword }) => {
        const providers = auth.currentUser.auth.currentUser.reloadUserInfo.providerUserInfo;
        const hasPassword = providers.findIndex((provider) => provider.providerId === "password");
        console.log(!!hasPassword);
    };

    return (
        <form className="changePasswordForm" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="header">Change password</h1>
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
