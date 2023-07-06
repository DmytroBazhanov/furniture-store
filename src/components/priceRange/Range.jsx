import { forwardRef } from "react";

export default forwardRef(function Range(props, ref) {
    const {
        minPrice,
        maxPrice,
        handleMinChange,
        handleMaxChange,
        maxPossibleValue,
        minPossibleValue,
    } = props;

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
                    onChange={handleMinChange}
                />
                <div className="tail" id="tail2" ref={ref[1]}></div>
            </div>
        </div>
    );
});
