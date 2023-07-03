import { useEffect, useState, useRef } from "react";
import { getEdgePrices } from "../../queries/filters";
import { FRACTAL_LENGHT } from "./config";

export default function Range({ firstEdgeValue, secondEdgeValue }) {
    const [minPrice, setMin] = useState(0);
    const [maxPrice, setMax] = useState(0);
    const [firstRangeValue, setFirstValue] = useState(0);
    const [secondRangeValue, setSecondValue] = useState(0);

    const rangeRef = useRef(null);

    const getPrices = async () => {
        const edgePrices = await getEdgePrices("kitchen");

        const min = edgePrices[0];
        const max = edgePrices[1];

        setMin(min);
        setMax(max);

        const fractalCount = rangeRef.current.offsetWidth;
        const fractalPrice = (max - min) / fractalCount;
    };

    const move = (event) => {
        const elemRect = rangeRef.current.getBoundingClientRect();
        const start = elemRect.left + 10;
        const end = rangeRef.current.offsetWidth - 20;
        console.log(end);
        if (event.pageX <= start) {
            setFirstValue(0);
        } else if (event.pageX - start >= secondRangeValue - 20) {
            setFirstValue(end - 20);
        } else {
            setFirstValue(event.pageX - start);
        }
    };

    const startDrag = (event) => {
        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", endDrag);
        document.body.style.userSelect = "none";
    };

    const endDrag = (event) => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", endDrag);
        document.body.style.userSelect = "auto";
    };

    useEffect(() => {
        getPrices();
        setSecondValue(rangeRef.current.offsetWidth - 20);
    }, []);

    return (
        <div className="range" ref={rangeRef}>
            <div
                className="firstEdge"
                id="firstEdge"
                style={{ left: firstRangeValue }}
                onMouseDown={startDrag}
            >
                {firstEdgeValue}
            </div>
            <div className="secondEdge" id="secondEdge" style={{ left: secondRangeValue }}>
                {secondEdgeValue}
            </div>
        </div>
    );
}
