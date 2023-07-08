import { useState, useEffect } from "react";

export default function InformationDisplay({
    minPrice,
    maxPrice,
    currency,
    handleMaxChange,
    handleMinChange,
    minPossibleValue,
    maxPossibleValue,
    applyFilters,
}) {
    const [currentMinValue, setCurrentMin] = useState(0);
    const [currentMaxValue, setCurrentMax] = useState(0);

    const handleChangeConfirmation = (event) => {
        if (event.key !== "Enter") return;

        const min = handleMinValueChange();
        const max = handleMaxValueChange();
        applyFilters(true, max, min);
    };

    const handleMaxValueChange = () => {
        if (currentMaxValue >= maxPossibleValue) {
            handleMaxChange(null, maxPossibleValue);
            setCurrentMax(maxPossibleValue);
            return maxPossibleValue;
        } else if (currentMaxValue <= minPrice) {
            handleMaxChange(null, minPrice);
            setCurrentMax(minPrice);
            return minPrice;
        } else {
            handleMaxChange(null, currentMaxValue);
            return currentMaxValue;
        }
    };

    const handleMinValueChange = () => {
        if (currentMinValue >= maxPrice) {
            handleMinChange(null, maxPrice);
            setCurrentMin(maxPrice);
            return maxPrice;
        } else if (currentMinValue <= minPossibleValue) {
            handleMinChange(null, minPossibleValue);
            setCurrentMin(minPossibleValue);
            return minPossibleValue;
        } else {
            handleMinChange(null, currentMinValue);
            return currentMinValue;
        }
    };

    const handleCurrentMinChage = (event) => setCurrentMin(Number(event.target.value));
    const handleCurrentMaxChage = (event) => setCurrentMax(Number(event.target.value));

    useEffect(() => {
        setCurrentMin(minPrice);
        setCurrentMax(maxPrice);
    }, [minPrice, maxPrice]);

    return (
        <div className="informationDisplay">
            <input
                type="number"
                className="numberPlace"
                value={currentMinValue}
                onChange={handleCurrentMinChage}
                onKeyDown={handleChangeConfirmation}
            />
            <div className="currency">{currency}</div>
            <input
                type="number"
                className="numberPlace"
                value={currentMaxValue}
                onChange={handleCurrentMaxChage}
                onKeyDown={handleChangeConfirmation}
            />
        </div>
    );
}
