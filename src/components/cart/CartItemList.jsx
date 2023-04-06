import CartItem from "./CartItem";
import "./cart.scss";

export default function CartItemList({ products }) {
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
        </div>
    );
}
