import { useEffect, useRef } from "react";

import "./intersectionDetector.scss";

export default function IntersectionDetector({ children, id, isActive, onIntersect }) {
    const detectorRef = useRef(null);

    const handleIntersect = (elements) => {
        if (elements[0].isIntersecting) {
            onIntersect();
        }
    };

    const intersectionObserver = new IntersectionObserver((elements) => handleIntersect(elements), {
        root: null,
        rootMargin: "0px",
        threshold: 1,
    });

    useEffect(() => {
        if (!isActive) {
            intersectionObserver.unobserve(detectorRef.current);
        } else {
            intersectionObserver.observe(detectorRef.current);
        }

        return () => {
            intersectionObserver.disconnect();
        };
    }, [isActive]);

    return (
        <div ref={detectorRef} id={id} className="intersectionDetector">
            {children}
        </div>
    );
}
