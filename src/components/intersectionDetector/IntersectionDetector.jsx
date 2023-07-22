import { useEffect, useRef } from "react";

import "./intersectionDetector.scss";

export default function IntersectionDetector({ children, id, onIntersect }) {
    const detectorRef = useRef(null);

    const handleIntersect = (elements) => {
        if (elements[0].isIntersecting) {
            onIntersect();
        }
    };

    const intersectionObserver = new IntersectionObserver(handleIntersect);

    useEffect(() => {
        intersectionObserver.observe(detectorRef.current);

        return () => {
            intersectionObserver.disconnect();
        };
    }, []);

    return (
        <div ref={detectorRef} id={id} className="intersectionDetector">
            {children}
        </div>
    );
}
