import { useState } from "react";
import { EDITABLE_FIELDS, TICKER_STATES, validationFunction } from "./config";
import ProfileInput from "./ProfileInput";

export default function Fields({ profileDetails }) {
    const [errorObject, setErrors] = useState({});
    const [formState, setFormState] = useState("notTriggered");
    const [editedFields, setFields] = useState({});

    const handleFormStateChange = (editedFieldsObj) => {
        const editedFieldNames = Object.keys(editedFieldsObj);
        if (editedFieldNames.length > 0) setFormState("inProgress");
        else if (editedFieldNames.length === 0) setFormState("notTriggered");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);

        const errors = validationFunction(formProps);

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        console.log(formProps);
    };

    const renderSubmit = () => {
        const state = TICKER_STATES[formState];

        if (!state.message) return <input type="submit" />;

        return (
            <p className="formState" style={{ color: state.color }}>
                {state.message}
            </p>
        );
    };

    return (
        <form onSubmit={handleSubmit} className="fields">
            {EDITABLE_FIELDS.map((field) => {
                return (
                    <ProfileInput
                        key={field.name}
                        name={field.name}
                        type={field.type}
                        label={field.alias}
                        value={profileDetails[field.name]}
                        error={errorObject?.[field.name]}
                        setFields={setFields}
                        onFormStateChange={handleFormStateChange}
                    />
                );
            })}
            {renderSubmit()}
        </form>
    );
}
