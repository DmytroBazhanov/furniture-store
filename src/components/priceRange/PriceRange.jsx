import { useState } from "react";
import Range from "./Range";
import "./priceRange.scss";

export default function PriceRange() {
    const [minPrice, setMin] = useState(0);
    const [maxPrice, setMax] = useState(0);

    return (
        <div className="priceRangeContainer">
            <h1 className="priceRangeHeader filterGroupName">Price range</h1>
            <Range minPrice={minPrice} maxPrice={maxPrice} setMax={setMax} setMin={setMin} />
            {minPrice}
            ||
            {maxPrice}
        </div>
    );
}
