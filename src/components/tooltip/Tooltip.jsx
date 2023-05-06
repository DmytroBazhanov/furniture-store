import { useState, useEffect, useRef } from "react";
import "./tooltip.scss";

export default function Tooltip({ children, text, disableIfToSmall = false, padding = 5 }) {
    const [containerWidth, setContainerWidth] = useState(0);
    const [tooltipWidth, setTooltipWidth] = useState(0);

    const containerRef = useRef(null);
    const tooltipRef = useRef(null);

    useEffect(() => {
        setContainerWidth(containerRef.current.offsetWidth);
        setTooltipWidth(tooltipRef.current.offsetWidth);
    }, [children]);

    const tooltipStyle =
        tooltipWidth - padding * 2 <= containerWidth &&
        tooltipWidth !== 0 &&
        tooltipWidth !== padding * 2 &&
        disableIfToSmall
            ? { animationName: "none", visibility: "hidden" }
            : {};

    return (
        <div className="tooltip-container" ref={containerRef}>
            {children}
            <div ref={tooltipRef} className="lengthChecker">
                {text}
            </div>
            <div className="tooltip" style={{ padding, ...tooltipStyle }}>
                {text}
            </div>
        </div>
    );
}
