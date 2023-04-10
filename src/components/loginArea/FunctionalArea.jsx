import "./loginArea.scss";

export default function FunctionalArea({ fullname }) {
    return (
        <div className="userArea">
            <p className="welcomeMsg">Hi, welcome!</p>
            <p className="fullname">{fullname}</p>
        </div>
    );
}
