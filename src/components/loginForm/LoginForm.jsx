import { useForm } from "react-hook-form";
import { signInWithEmail } from "../../queries/auth";

import "./loginForm.scss";
import SocialMediaLogin from "../socialMediaLogin/SocialMediaLogin";
import Input from "../input/Input";
import { useState } from "react";
import PasswordInput from "../input/PasswordInput";

export default function LoginForm() {
    const [loginError, setError] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const login = async ({ email, password }) => {
        const result = await signInWithEmail(email, password);
        setError(result);
    };

    return (
        <form className="loginForm" onSubmit={handleSubmit(login)}>
            <h1 className="header">Sign in</h1>
            <SocialMediaLogin />
            <div className="inputContainer">
                <Input
                    type="text"
                    placeholder="Enter the email"
                    errors={errors?.email}
                    name="Email"
                    reg={register("email", {
                        required: {
                            value: true,
                            message: "Field is required",
                        },
                        pattern: {
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Not valid email, please enter valid email address",
                        },
                    })}
                />
                <PasswordInput
                    placeholder="Enter the password"
                    name="Pasword"
                    errors={errors?.password}
                    reg={register("password", {
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
            </div>
            <p className="passwordRestoration">Click here to restore password</p>
            <input type="submit" value="Continue" />
            <p className="loginError">{loginError}</p>
        </form>
    );
}
