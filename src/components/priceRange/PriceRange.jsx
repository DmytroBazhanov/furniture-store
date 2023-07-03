import Range from "./Range";
import "./priceRange.scss";

export default function PriceRange() {
    return (
        <div className="priceRangeContainer">
            <h1 className="priceRangeHeader filterGroupName">Price range</h1>
            <Range />
        </div>
    );
}
