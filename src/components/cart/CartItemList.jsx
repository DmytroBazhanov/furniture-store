import { Link } from "react-router-dom";
import EmptyContainerPlaceholder from "../emptyContainerPlaceholder/EmptyContainerPlaceholder";
import CartItem from "./CartItem";
import "./cart.scss";

export default function CartItemList({ products, setVisible }) {
    if (products.length === 0) {
        return <EmptyContainerPlaceholder text="Cart is empty" />;
    }

    const handleCheckoutClick = () => setVisible(false);

    return (
        <div className="cartItemsList">
            {products.map((prod) => (
                <CartItem
                    key={prod.instanceID}
                    productID={prod.productID}
                    itemCount={prod.count}
                    properties={prod.properties}
                />
            ))}
            <Link className="checkoutLink" to="checkout" onClick={handleCheckoutClick}>
                Click to checkout
            </Link>
        </div>
    );
}
