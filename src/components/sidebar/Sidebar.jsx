import { ReactComponent as Cross } from "../../assets/cross.svg";

import "./sidebar.scss";

export default function Sidebar({ headerContent, mainContent, setVisibility, visible }) {
    const visibilityClass = visible ? "visible" : "hidden";

    return (
        <div className={`sidebar-background ${visibilityClass}`}>
            <aside className={`sidebar ${visibilityClass}`}>
                <div className="sidebar-topPart">
                    {headerContent}
                    <Cross className="sidebar-close" onClick={() => setVisibility(false)} />
                </div>
                {mainContent}
            </aside>
        </div>
    );
}
