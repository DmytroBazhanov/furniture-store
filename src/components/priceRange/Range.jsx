import { useState, useEffect, useRef } from "react";
import { getEdgePrices } from "../../queries/filters";

export default function Range({ minPrice, maxPrice, setMin, setMax, width }) {
    const [minPossibleValue, setMinPossible] = useState(0);
    const [maxPossibleValue, setMaxPossible] = useState(0);

    const tailRef = useRef(null);
    const secondTailRef = useRef(null);

    const handleMinChange = (event) => {
        const val = Number(event.target.value);
        if (maxPrice >= val) setMin(val);
        else setMin(maxPrice);
        secondTailRef.current.style.width = `${
            (200 / 100) * ((val / maxPossibleValue) * 100) - 1
        }px`;
    };

    const handleMaxChange = (event) => {
        const val = Number(event.target.value);
        if (minPrice <= val) setMax(val);
        else setMax(minPrice);
        // tailRef.current.style.width = `${(200 / 100) * ((val / maxPossibleValue) * 100) - 1}px`; // for min
        tailRef.current.style.width = `${
            width - (width / 100) * ((val / maxPossibleValue) * 100)
        }px`; // for max
    };

    useEffect(() => {
        getEdgePrices("kitchen").then((values) => {
            setMinPossible(values[0]);
            setMaxPossible(values[1]);
            setMin(values[0]);
            setMax(values[1]);
            tailRef.current.style.width = `0px`;
        });
    }, []);

    return (
        <div className="rangeContainer">
            <div className="inputContainer">
                <input
                    className="maxEdge"
                    type="range"
                    min={minPossibleValue}
                    max={maxPossibleValue}
                    value={maxPrice}
                    step={0.01}
                    onChange={handleMaxChange}
                />
                <div className="tail" id="tail1" ref={tailRef}></div>
            </div>
            <div className="sliderPath" style={{ width: width }}></div>
            <div className="inputContainer">
                <input
                    className="minEdge"
                    type="range"
                    min={minPossibleValue}
                    max={maxPossibleValue}
                    value={minPrice}
                    step={0.01}
                    onChange={handleMinChange}
                />
                <div className="tail" id="tail2" ref={secondTailRef}></div>
            </div>
        </div>
    );
}
