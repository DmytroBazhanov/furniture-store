import { useForm } from "react-hook-form";

import "./loginForm.scss";

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        watch,
        trigger,
        setError,
        formState: { errors },
    } = useForm();

    const email = watch("email");

    return (
        <form className="loginForm" onSubmit={handleSubmit(() => {})}>
            <input
                id="email"
                type="text"
                {...register("email", {
                    pattern:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
            />
            <input
                id="password"
                type="password"
                {...register("password", {
                    onChange: () => {
                        trigger("password");
                    },
                    maxLength: {
                        value: 10,
                        message: "Too long password, we need something simpler to hack you fast",
                    },
                })}
            />
            <input type="submit" />
            {errors?.password?.message}
        </form>
    );
}
