import { useEffect, useState, useRef } from "react";

import { ReactComponent as EditSVG } from "../../assets/EditIcon.svg";

import ErrorMessage from "./ErrorMessage";

export default function ProfileInput({
    type,
    label,
    name,
    value,
    error,
    setFields,
    onFormStateChange,
    profileDetails = null,
}) {
    const [isEditing, setEditing] = useState(false);
    const [tempValue, setTemp] = useState("");

    const inputRef = useRef(null);

    const togleMode = () => {
        setEditing((prev) => !prev);
    };

    const handleInputTracking = (currentValue) => {
        if (currentValue !== value) {
            setFields((prev) => {
                onFormStateChange({ ...prev, [name]: value });
                return { ...prev, [name]: value };
            });
        } else if (currentValue === value) {
            setFields((prev) => {
                const current = prev;
                delete current[name];
                onFormStateChange(current);
                return current;
            });
        }
    };

    const handleChange = (event) => {
        if (!isEditing) return;

        const val = event.target.value;
        handleInputTracking(val);
        setTemp(val);
    };

    useEffect(() => {
        if (value) setTemp(value);
    }, [value]);

    useEffect(() => {
        inputRef.current.blur();
        setEditing(false);
    }, [profileDetails]);

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
            <ErrorMessage error={error} />
        </div>
    );
}
