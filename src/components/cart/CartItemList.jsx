import { Link } from "react-router-dom";
import EmptyContainerPlaceholder from "../emptyContainerPlaceholder/EmptyContainerPlaceholder";
import CartItem from "./CartItem";
import "./cart.scss";

export default function CartItemList({ products }) {
    if (products.length === 0) {
        return <EmptyContainerPlaceholder text="Cart is empty" />;
    }

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
            <Link className="checkoutLink" to="checkout">
                Click to checkout
            </Link>
        </div>
    );
}
