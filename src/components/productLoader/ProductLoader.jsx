import { useState, useRef, useEffect } from "react";
import { ReactComponent as LoadMoreSVG } from "../../assets/LoadMore.svg";
import { getProductLimit } from "../../pages/ProductListingPage/config";
import { filterObjecttIntoArray } from "../../utils/filterObjectIntoArray";
import IntersectionDetector from "../intersectionDetector/IntersectionDetector";

import "./prouctLoader.scss";

export default function ProductLoader({
    onLoad,
    lastProductSnapshot,
    filters,
    isFirstLoad,
    requestInProgress,
}) {
    const [isActive, setActive] = useState(true);

    const valueRef = useRef(null);
    const filtersRef = useRef(null);
    const inProgressRef = useRef(null);
    valueRef.current = lastProductSnapshot;
    filtersRef.current = filters;
    inProgressRef.current = requestInProgress;

    const handleLoad = async () => {
        const result = await onLoad(
            valueRef.current,
            filterObjecttIntoArray(filtersRef.current),
            inProgressRef.current
        );

        if (result === null) {
            setTimeout(handleLoad, 500);
            return;
        }

        const width = window.innerWidth;
        const productLimit = getProductLimit(width);

        if (result && result.length < productLimit) {
            setActive(false);
        }
    };

    useEffect(() => {
        if (!isFirstLoad) {
            setActive(true);
        }
    }, [filters]);

    if (!isActive) return null;

    return (
        <IntersectionDetector onIntersect={handleLoad} isActive={isActive} id="productLoader">
            <p className="productLoader">
                <LoadMoreSVG />
                <span>Loading more products</span>
            </p>
        </IntersectionDetector>
    );
}
