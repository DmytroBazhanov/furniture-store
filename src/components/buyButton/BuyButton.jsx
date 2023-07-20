import { useState, useEffect } from "react";

import { ReactComponent as BasketSVG } from "../../assets/Basket.svg";
import { ReactComponent as CheckmarkSVG } from "../../assets/LightCheck.svg";

import "./buyButton.scss";

export default function BuyButton({
    price,
    originalPrice,
    children,
    isAvailable,
    onClick,
    isDisabled = false,
}) {
    const [isInCart, setInCart] = useState(false);
    const [timeoutID, setTimeoutID] = useState(null);

    const unblockButton = () => {
        setInCart(false);
        clearTimeout(timeoutID);
        setTimeoutID(null);
    };

    const handleClick = () => {
        onClick();
        setInCart(true);

        const id = setTimeout(() => {
            setInCart(false);
        }, 2000);

        setTimeoutID(id);
    };

    const originalPriceTag = originalPrice !== price && (
        <div className="originalPriceTag">${originalPrice}</div>
    );

    const productAdded = (
        <div className="productAdded" onClick={unblockButton}>
            <CheckmarkSVG /> Product added to cart
        </div>
    );

    const tagState = originalPriceTag ? "-sale" : "";

    useEffect(() => {
        return () => {
            clearTimeout(timeoutID);
        };
    }, []);

    if (!isAvailable) return <div className="notInStock">Product not in stock</div>;
    if (isInCart) return productAdded;

    return (
        <button className="buyButton" disabled={isDisabled} onClick={handleClick}>
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
