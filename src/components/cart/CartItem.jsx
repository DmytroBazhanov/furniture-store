import "./cart.scss";
import { getProductByID } from "../../queries/products";
import { useState, useEffect } from "react";

export default function CartItem({ productID, itemCount }) {
    const [productDetails, setDetails] = useState(null);

    useEffect(() => {
        getProductByID(productID).then((details) => setDetails(details));
    }, []);

    return (
        <div className="cartItem">
            <img src={productDetails?.imageUrl} alt="product" />
            <div className="cartItem-description">
                <p className="cartItem-description-header">{productDetails?.name}</p>
                <p className="cartItem-description-price">${productDetails?.price}</p>
                <div className="cartItem-description-productCountArea">
                    <button>+</button>
                    <p className="cartItem-description-count">{itemCount}</p>
                    <button>-</button>
                </div>
            </div>
        </div>
    );
}
