import CheckoutItem from "./CheckoutItem";
import getTotalPrice from "../../utils/getTotalPrice";

import "./checkoutItems.scss";

export default function CheckoutItems({ items }) {
    return (
        <div className="checkout-items">
            <h1 className="checkout-items__header">Checkout Items</h1>
            <div className="checkout-items__item-container">
                {items.map((item) => (
                    <CheckoutItem key={item.instanceID} item={item} />
                ))}
            </div>
            <h1 className="checkout-items__total-price">
                Total price: <span>${getTotalPrice(items)}</span>
            </h1>
        </div>
    );
}
