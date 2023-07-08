import { forwardRef } from "react";

export default forwardRef(function Range(props, ref) {
    const {
        minPrice,
        maxPrice,
        handleMinChange,
        handleMaxChange,
        maxPossibleValue,
        minPossibleValue,
        applyFilters,
    } = props;

    const handleMaxValueChange = (event) => {
        const val = Number(event.target.value);
        handleMaxChange(event, null, false);
        applyFilters(false, val, minPrice);
    };

    const handleMinValueChange = (event) => {
        const val = Number(event.target.value);
        handleMinChange(event, null, false);
        applyFilters(false, maxPrice, val);
    };

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
                    onInput={handleMaxValueChange}
                />
                <div className="tail" id="tail1" ref={ref[0]}></div>
            </div>
            <div className="sliderPath"></div>
            <div className="inputContainer">
                <input
                    className="minEdge"
                    type="range"
                    min={minPossibleValue}
                    max={maxPossibleValue}
                    value={minPrice}
                    step={0.01}
                    onInput={handleMinValueChange}
                />
                <div className="tail" id="tail2" ref={ref[1]}></div>
            </div>
        </div>
    );
});
