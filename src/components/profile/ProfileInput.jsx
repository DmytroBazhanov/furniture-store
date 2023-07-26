import { useEffect, useState, useRef } from "react";

import { ReactComponent as EditSVG } from "../../assets/EditIcon.svg";

export default function ProfileInput({ type, label, name, value }) {
    const [isEditing, setEditing] = useState(false);
    const [tempValue, setTemp] = useState("");

    const inputRef = useRef(null);

    const togleMode = () => {
        setEditing((prev) => !prev);
    };

    const handleChange = (event) => {
        if (!isEditing) return;

        const val = event.target.value;
        setTemp(val);
    };

    useEffect(() => {
        if (value) setTemp(value);
    }, []);

    useEffect(() => {
        if (isEditing) inputRef.current.focus();
    }, [isEditing]);

    return (
        <div className="profileInputContainer">
            <label>{label}:</label>
            <input
                ref={inputRef}
                className={isEditing ? "visible" : "hidden"}
                type={type}
                name={name}
                value={tempValue}
                onInput={handleChange}
            />
            <p className={`text ${!isEditing ? "visible" : "hidden"}`}>{tempValue}</p>
            <EditSVG onClick={togleMode} />
        </div>
    );
}
