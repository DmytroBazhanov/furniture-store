import Tooltip from "../tooltip/Tooltip";

import "./input.scss";

export default function Input({ type, placeholder, name, errors, reg }) {
    const tooltip = errors ? (
        <Tooltip text={errors?.message}>
            <p className="infoSign">i</p>
        </Tooltip>
    ) : null;

    const errorClass = errors ? "inputError" : "";

    return (
        <div className="inputHolder">
            <div className="inputInfoLine">
                <h6 className="inputName">{name}</h6>
                {tooltip}
            </div>
            <input
                className={`input ${errorClass}`}
                placeholder={placeholder}
                type={type}
                {...reg}
            />
        </div>
    );
}
