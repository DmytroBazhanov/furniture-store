import { useRef } from "react";

export default function Dashboard({ setAvatar }) {
    const inputRef = useRef(null);

    return (
        <div className="dashboard">
            <button className="changePassword">Change password</button>
            <label className="changeAvatar">
                Upload new avatar
                <input ref={inputRef} type="file" />
            </label>
        </div>
    );
}
