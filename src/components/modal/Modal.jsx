import OutsideClick from "../outsideClick/OutsideClick";
import "./modal.scss";

export default function Modal({ children, isVisible, onClose }) {
    if (!isVisible) return null;

    return (
        <div className="modal">
            <OutsideClick onOutsideClick={onClose} id="modal">
                {children}
            </OutsideClick>
        </div>
    );
}
