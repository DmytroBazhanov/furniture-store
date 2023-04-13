import { useForm } from "react-hook-form";
import { registerUserWithEmail } from "../../queries/auth";
import { useState } from "react";

import SocialMediaLogin from "../socialMediaLogin/SocialMediaLogin";
import Input from "../input/Input";
import PasswordInput from "../input/PasswordInput";

import "./registerForm.scss";

export default function RegisterForm() {
    const [errorMessage, setErrorMessage] = useState();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const signUpNewUser = async ({ email, password }) => {
        const result = await registerUserWithEmail(email, password);
        setErrorMessage(result);
    };

    return (
        <form className="registerForm" onSubmit={handleSubmit(signUpNewUser)}>
            <h1 className="header">Sign up</h1>
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
                <PasswordInput
                    placeholder="Repeat the password"
                    name="Repeat pasword"
                    errors={errors?.repeatPassword}
                    reg={register("repeatPassword", {
                        required: {
                            value: true,
                            message: "Field is required",
                        },
                        validate: {
                            passwordMatch: (repeat, formValues) => {
                                return repeat === formValues.password || "Passwords should match";
                            },
                        },
                    })}
                />
            </div>
            <input type="submit" value="Continue" />
            <p className="errorMessage">{errorMessage}</p>
        </form>
    );
}
