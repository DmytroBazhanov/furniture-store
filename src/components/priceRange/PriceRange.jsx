import { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { FilterContext } from "../../pages/ProductListingPage/ProductListingPage";
import { getEdgePrices } from "../../queries/filters";
import Range from "./Range";
import InformationDisplay from "./InformationDisplay";

import "./priceRange.scss";

export default function PriceRange({ width = 0 }) {
    const [minPrice, setMin] = useState(0);
    const [maxPrice, setMax] = useState(0);
    const [minPossibleValue, setMinPossible] = useState(0);
    const [maxPossibleValue, setMaxPossible] = useState(0);

    const tailRef = useRef(null);
    const secondTailRef = useRef(null);
    const rangeContainerRef = useRef(null);

    const [timerID, setTimerID] = useState(null);

    const { setFilters, filters } = useContext(FilterContext);

    const { categoryID } = useParams();

    const applyFilters = (skipTimer, maxVal, minVal) => {
        if (timerID) {
            clearTimeout(timerID);
            setTimerID(null);
        }

        if (!skipTimer) {
            const timeoutID = setTimeout(() => {
                setFilters((prev) => {
                    return { ...prev, price: { minPrice: minVal, maxPrice: maxVal } };
                });
            }, 2000);

            setTimerID(timeoutID);
        } else {
            setFilters((prev) => {
                return { ...prev, price: { minPrice: minVal, maxPrice: maxVal } };
            });
        }
    };

    const handleMaxChange = (event, value = null) => {
        const val = Number(value ?? event.target.value);
        const offsetWidth = rangeContainerRef.current.offsetWidth;
        const rangeWidth = offsetWidth === 0 ? width : offsetWidth;

        if (minPrice <= val) {
            setMax(val);
            tailRef.current.style.width = `${
                rangeWidth - (rangeWidth / 100) * ((val / maxPossibleValue) * 100)
            }px`;
        } else {
            setMax(minPrice);
            tailRef.current.style.width = `${
                rangeWidth - (rangeWidth / 100) * ((minPrice / maxPossibleValue) * 100)
            }px`;
        }
    };

    const handleMinChange = (event, value = null) => {
        const val = Number(value ?? event.target.value);
        const offsetWidth = rangeContainerRef.current.offsetWidth;
        const rangeWidth = offsetWidth === 0 ? width : offsetWidth;

        if (maxPrice >= val) {
            setMin(val);
            secondTailRef.current.style.width = `${
                (rangeWidth / 100) * ((val / maxPossibleValue) * 100) - 1
            }px`;
        } else {
            setMin(maxPrice);
        }
    };

    useEffect(() => {
        getEdgePrices(categoryID).then((values) => {
            setMinPossible(values[0]);
            setMaxPossible(values[1]);
            setMin(values[0]);
            setMax(values[1]);
            tailRef.current.style.width = `0px`;
        });
    }, []);

    useEffect(() => {
        if (filters?.price) {
            handleMinChange(null, filters.price.minPrice);
            handleMaxChange(null, filters.price.maxPrice);
        }
    }, [filters]);

    return (
        <div className="priceRangeContainer" ref={rangeContainerRef}>
            <h1 className="priceRangeHeader">Price range</h1>
            <Range
                minPrice={minPrice}
                maxPrice={maxPrice}
                applyFilters={applyFilters}
                handleMinChange={handleMinChange}
                handleMaxChange={handleMaxChange}
                maxPossibleValue={maxPossibleValue}
                minPossibleValue={minPossibleValue}
                ref={[tailRef, secondTailRef]}
            />
            <InformationDisplay
                minPrice={minPrice}
                maxPrice={maxPrice}
                currency={"USD $"}
                applyFilters={applyFilters}
                handleMinChange={handleMinChange}
                handleMaxChange={handleMaxChange}
                minPossibleValue={minPossibleValue}
                maxPossibleValue={maxPossibleValue}
            />
        </div>
    );
}
