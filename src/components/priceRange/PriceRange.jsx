import { useState, useEffect, useRef } from "react";
import { getEdgePrices } from "../../queries/filters";
import Range from "./Range";
import InformationDisplay from "./InformationDisplay";

import "./priceRange.scss";

export default function PriceRange({ width = 200 }) {
    const [minPrice, setMin] = useState(0);
    const [maxPrice, setMax] = useState(0);
    const [minPossibleValue, setMinPossible] = useState(0);
    const [maxPossibleValue, setMaxPossible] = useState(0);

    const tailRef = useRef(null);
    const secondTailRef = useRef(null);

    const handleMaxChange = (event, value = null) => {
        const val = value ?? Number(event.target.value);
        if (minPrice <= val) {
            setMax(val);
            tailRef.current.style.width = `${
                width - (width / 100) * ((val / maxPossibleValue) * 100)
            }px`;
        } else {
            setMax(minPrice);
            tailRef.current.style.width = `${
                width - (width / 100) * ((minPrice / maxPossibleValue) * 100)
            }px`;
        }
    };

    const handleMinChange = (event, value = null) => {
        const val = value ?? Number(event.target.value);
        if (maxPrice >= val) {
            setMin(val);
            secondTailRef.current.style.width = `${
                (width / 100) * ((val / maxPossibleValue) * 100) - 1
            }px`;
        } else setMin(maxPrice);
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
        <div className="priceRangeContainer" style={{ width: width }}>
            <h1 className="priceRangeHeader">Price range</h1>
            <Range
                minPrice={minPrice}
                maxPrice={maxPrice}
                handleMinChange={handleMinChange}
                handleMaxChange={handleMaxChange}
                maxPossibleValue={maxPossibleValue}
                minPossibleValue={minPossibleValue}
                width={width}
                ref={[tailRef, secondTailRef]}
            />
            <InformationDisplay
                minPrice={minPrice}
                maxPrice={maxPrice}
                currency={"USD $"}
                handleMinChange={handleMinChange}
                handleMaxChange={handleMaxChange}
                minPossibleValue={minPossibleValue}
                maxPossibleValue={maxPossibleValue}
            />
        </div>
    );
}
