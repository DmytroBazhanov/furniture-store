import "./saleBadge.scss";
import { getCurrentSale } from "../../queries/sales";
import { useState } from "react";

export default function SaleBadge() {
    const [badgeSettings, setSettings] = useState({});

    const handleRefresh = async () => {
        const settings = await getCurrentSale();
        setSettings(settings);
    };

    const style = {
        color: badgeSettings.color,
        backgroundColor: badgeSettings.backgroundColor,
    };

    const dotStyle = {
        backgroundColor: badgeSettings.color,
        boxShadow: `0px 0px 3px 1px ${badgeSettings.color}`,
    };

    return (
        <div className="salesBadge" style={style} onClick={handleRefresh}>
            <span className="dot" style={dotStyle}></span>
            {badgeSettings.name ?? "Click to refresh"}
        </div>
    );
}
