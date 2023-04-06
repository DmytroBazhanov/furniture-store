import "./tooltip.scss";

export default function Tooltip({ children, text }) {
    return (
        <div className="tooltip-container">
            {children}
            <div className="tooltip">{text}</div>
        </div>
    );
}
