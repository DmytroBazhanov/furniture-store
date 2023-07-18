import "./badge.scss";

export default function Badge({ className, children, onClick }) {
    return (
        <div className={`badge ${className}`} onClick={onClick}>
            {children}
        </div>
    );
}
