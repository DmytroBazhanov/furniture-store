import { useEffect, useState } from "react";

import { ReactComponent as EditSVG } from "../../assets/EditIcon.svg";

export default function ProfileInput({ type, label, value }) {
    const [isEditing, setEditing] = useState(false);
    const [tempValue, setTemp] = useState("");

    const togleMode = () => setEditing((prev) => !prev);

    const handleChange = (event) => {
        if (!isEditing) return;

        const val = event.target.value;
        setTemp(val);
    };

    useEffect(() => {
        if (value) setTemp(value);
    }, []);

    const edditingModeClass = isEditing ? "editMode" : "";

    return (
        <div className="profileInputContainer">
            <label>{label}:</label>
            <input
                className={edditingModeClass}
                type={type}
                value={tempValue}
                onInput={handleChange}
                disabled={!isEditing}
            />
            <EditSVG onClick={togleMode} />
        </div>
    );
}
