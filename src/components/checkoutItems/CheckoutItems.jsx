import CheckoutItem from "./CheckoutItem";
import getTotalPrice from "../../utils/getTotalPrice";
import EmptyContainerPlaceholder from "../emptyContainerPlaceholder/EmptyContainerPlaceholder";

import "./checkoutItems.scss";

export default function CheckoutItems({ items }) {
    const content =
        items.lenght > 0 ? (
            <div className="checkout-items__item-container">
                <div className="checkout-items__scroll-container">
                    {items.map((item) => (
                        <CheckoutItem key={item.instanceID} item={item} />
                    ))}
                </div>
            </div>
        ) : (
            <EmptyContainerPlaceholder text="Cart is empty" />
        );

    return (
        <div className="checkout-items">
            <h1 className="checkout-items__header">Checkout Items</h1>
            {content}
            <h1 className="checkout-items__total-price">
                Total price: <span>${getTotalPrice(items)}</span>
            </h1>
        </div>
    );
}
