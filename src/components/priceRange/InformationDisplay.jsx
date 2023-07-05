export default function InformationDisplay({ minPrice, maxPrice, currency }) {
    return (
        <div className="informationDisplay">
            <input type="number" className="numberPlace" value={minPrice} />
            <div className="currency">{currency}</div>
            <input type="number" className="numberPlace" value={maxPrice} />
        </div>
    );
}
