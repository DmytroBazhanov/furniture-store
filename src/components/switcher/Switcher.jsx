import "./switcher.scss";

// { id, content, function }

export default function Switcher({ currentState, buttons }) {
    return (
        <div className="switcher">
            {buttons.map((button) => (
                <button
                    key={button.id}
                    id={button.id}
                    className={`switchButton ${currentState === button.id ? "chosen" : ""}`}
                    onClick={button.function}
                >
                    {button.content}
                </button>
            ))}
        </div>
    );
}
