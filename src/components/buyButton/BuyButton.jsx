import { ReactComponent as BasketSVG } from "../../assets/Basket.svg";

import "./buyButton.scss";

export default function BuyButton({
    price,
    originalPrice,
    children,
    isAvailable,
    isDisabled = false,
}) {
    const originalPriceTag = originalPrice !== price && (
        <div className="originalPriceTag">${originalPrice}</div>
    );

    const tagState = originalPriceTag ? "-sale" : "";

    if (!isAvailable) return <div className="notInStock">Product not in stock</div>;

    return (
        <button className="buyButton" disabled={isDisabled}>
            <span className="text">
                <BasketSVG />
                {children}
            </span>
            <div className="priceContainer">
                <div className={`priceTag${tagState}`}>
                    {originalPriceTag}
                    <span>${price}</span>
                </div>
            </div>
        </button>
    );
}
