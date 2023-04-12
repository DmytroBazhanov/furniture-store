import { ReactComponent as Hide } from "../../assets/HidePassword.svg";
import { ReactComponent as Show } from "../../assets/ShowPassword.svg";
import { useState } from "react";
import Input from "./Input";

import "./input.scss";

export default function PasswordInput({ placeholder, name, errors, reg }) {
    const [isRevealed, setRevealed] = useState(false);

    const reveal = (e) => {
        e.stopPropagation();
        setRevealed(true);
    };
    const conceal = (e) => {
        e.stopPropagation();
        setRevealed(false);
    };

    return (
        <div className="passwordInput">
            <Input
                type={isRevealed ? "text" : "password"}
                placeholder={placeholder}
                name={name}
                errors={errors}
                reg={reg}
            />
            {isRevealed ? (
                <Hide className="passwordInputSymbol" onClick={conceal} />
            ) : (
                <Show className="passwordInputSymbol" onClick={reveal} />
            )}
        </div>
    );
}
