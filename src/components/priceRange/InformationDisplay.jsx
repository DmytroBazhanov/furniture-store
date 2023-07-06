import { useState, useEffect } from "react";

export default function InformationDisplay({
    minPrice,
    maxPrice,
    currency,
    handleMaxChange,
    handleMinChange,
    minPossibleValue,
    maxPossibleValue,
}) {
    const [currentMinValue, setCurrentMin] = useState(0);
    const [currentMaxValue, setCurrentMax] = useState(0);

    const handleChangeConfirmation = (event) => {
        if (event.key !== "Enter") return;

        handleMinValueChange();
        handleMaxValueChange();
    };

    const handleMaxValueChange = () => {
        if (currentMaxValue >= maxPossibleValue) {
            handleMaxChange(null, maxPossibleValue);
            setCurrentMax(maxPossibleValue);
        } else if (currentMaxValue <= minPrice) handleMaxChange(null, minPrice);
        else handleMaxChange(null, currentMaxValue);
    };

    const handleMinValueChange = () => {
        if (currentMinValue >= maxPrice) {
            handleMinChange(null, maxPrice);
            setCurrentMin(minPossibleValue);
        } else if (currentMinValue <= minPossibleValue) handleMinChange(null, minPossibleValue);
        else handleMinChange(null, currentMinValue);
    };

    const handleCurrentMinChage = (event) => setCurrentMin(event.target.value);
    const handleCurrentMaxChage = (event) => setCurrentMax(event.target.value);

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
