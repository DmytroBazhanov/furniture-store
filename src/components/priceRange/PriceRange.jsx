import { useState } from "react";
import Range from "./Range";
import InformationDisplay from "./InformationDisplay";

import "./priceRange.scss";

export default function PriceRange({ width = 200 }) {
    const [minPrice, setMin] = useState(0);
    const [maxPrice, setMax] = useState(0);

    return (
        <div className="priceRangeContainer" style={{ width: width }}>
            <h1 className="priceRangeHeader">Price range</h1>
            <Range
                minPrice={minPrice}
                maxPrice={maxPrice}
                setMax={setMax}
                setMin={setMin}
                width={width}
            />
            <InformationDisplay minPrice={minPrice} maxPrice={maxPrice} currency={"USD $"} />
        </div>
    );
}
