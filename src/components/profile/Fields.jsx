import ProfileInput from "./ProfileInput";
import { EDITABLE_FIELDS } from "./config";

export default function Fields({ profileDetails, setFields }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        console.log(formProps);
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
                    />
                );
            })}
            <input type="submit" />
        </form>
    );
}
