import ProfileInput from "./ProfileInput";
import { EDITABLE_FIELDS } from "./config";

export default function Fields({ profileDetails }) {
    return (
        <div className="fields">
            {EDITABLE_FIELDS.map((field) => {
                return (
                    <ProfileInput
                        key={field.name}
                        type={field.type}
                        label={field.alias}
                        value={profileDetails[field.name]}
                    />
                );
            })}
        </div>
    );
}
