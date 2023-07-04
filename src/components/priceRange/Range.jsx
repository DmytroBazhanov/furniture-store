import { useEffect, useState, useRef } from "react";
import { getEdgePrices } from "../../queries/filters";
import { CONTROLLER_PADDING_FROM_RANGE_START, RANGE_CONTROLLER_SIZE } from "./config";

export default function Range({ setMin, setMax }) {
    const [firstRangeValue, setFirstRangeValue] = useState(0);
    const [secondRangeValue, setSecondRangeValue] = useState(0);
    const [fractalPrice, setFracPrice] = useState(0);
    const [minPossibleValue, setMinPossible] = useState(0);
    const [maxPossibleValue, setMaxPossible] = useState(0);

    const rangeRef = useRef(null);

    const getPrices = async () => {
        const edgePrices = await getEdgePrices("kitchen");

        const min = edgePrices[0];
        const max = edgePrices[1];

        setMin(min);
        setMax(max);
        setMinPossible(min);
        setMaxPossible(max);

        const fractalCount = rangeRef.current.offsetWidth - RANGE_CONTROLLER_SIZE * 2;
        setFracPrice((max - min) / fractalCount);
    };

    const moveRight = (event) => {
        const elemRect = rangeRef.current.getBoundingClientRect();
    };

    const startRightDrag = () => {
        document.addEventListener("mousemove", moveRight);
        document.addEventListener("mouseup", endRightDrag);
        document.body.style.userSelect = "none";
    };

    const endRightDrag = () => {
        document.removeEventListener("mousemove", moveRight);
        document.removeEventListener("mouseup", endRightDrag);
        document.body.style.userSelect = "auto";
    };

    const moveLeft = (event) => {
        const elemRect = rangeRef.current.getBoundingClientRect();
        // console.log(event.pageX);
        console.log(elemRect.left);
        if (event.pageX <= elemRect.left + 11) {
            setFirstRangeValue(0);
            setMin(minPossibleValue);
        } else if (event.pageX >= secondRangeValue + 10) {
            setFirstRangeValue(secondRangeValue - 20);
            setMin(maxPossibleValue);
        } else {
            setFirstRangeValue(event.pageX - elemRect.left - 10);
            setMin((event.pageX - RANGE_CONTROLLER_SIZE) * fractalPrice);
        }
    };

    const startLeftDrag = () => {
        document.addEventListener("mousemove", moveLeft);
        document.addEventListener("mouseup", endLeftDrag);
        document.body.style.userSelect = "none";
    };

    const endLeftDrag = () => {
        document.removeEventListener("mousemove", moveLeft);
        document.removeEventListener("mouseup", endLeftDrag);
        document.body.style.userSelect = "auto";
    };

    useEffect(() => {
        getPrices();
        setSecondRangeValue(rangeRef.current.offsetWidth - RANGE_CONTROLLER_SIZE);
    }, []);

    return (
        <div className="range" ref={rangeRef}>
            <div
                className="firstEdge"
                id="firstEdge"
                style={{ left: firstRangeValue }}
                onMouseDown={startLeftDrag}
            ></div>
            <div
                className="secondEdge"
                id="secondEdge"
                style={{ left: secondRangeValue }}
                onMouseDown={startRightDrag}
            ></div>
        </div>
    );
}
