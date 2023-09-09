import CheckoutItem from "./CheckoutItem";
import getTotalPrice from "../../utils/getTotalPrice";
import EmptyContainerPlaceholder from "../emptyContainerPlaceholder/EmptyContainerPlaceholder";

import "./checkoutItems.scss";
import CheckoutItemSpinner from "./CheckoutItemSpinner";

export default function CheckoutItems({ items, isLoaded }) {
    const renderContent = () => {
        if (isLoaded && items.length > 0) {
            return (
                <div className="checkout-items__item-container">
                    <div className="checkout-items__scroll-container">
                        {items.map((item) => (
                            <CheckoutItem key={item.instanceID} item={item} />
                        ))}
                    </div>
                </div>
            );
        } else if (!isLoaded) {
            return (
                <div className="checkout-items__item-container">
                    <div className="checkout-items__scroll-container">
                        <CheckoutItemSpinner />
                        <CheckoutItemSpinner />
                        <CheckoutItemSpinner />
                    </div>
                </div>
            );
        } else {
            <EmptyContainerPlaceholder text="Cart is empty" />;
        }
    };

    return (
        <div className="checkout-items">
            <h1 className="checkout-items__header">Checkout Items</h1>
            {renderContent()}
            <h1 className="checkout-items__total-price">
                Total price: <span>${getTotalPrice(items)}</span>
            </h1>
        </div>
    );
}
