import "./cart.scss";
import { getProductByID } from "../../queries/products";
import { useState, useEffect } from "react";
import PropertySelector from "../propertySelector/PropertySelector";
import {
    addToCart,
    findProduct,
    getProductFromCart,
    isObjectsEqual,
    reduceProductCount,
    updateProductInstanceProperties,
} from "../../utils/cart";

export default function CartItem({ productID, itemCount, properties }) {
    const [productDetails, setDetails] = useState(null);
    const [selectedProperties, setSelectedProps] = useState({});
    const [count, setCount] = useState(0);

    const handleUpdateProperties = (newProps) => {
        setSelectedProps((prev) => {
            const props = { ...prev, ...newProps };
            const productInCartID = findProduct(productID, props);

            if (productInCartID !== -1) return prev;

            const currentProdInstanceID = findProduct(productID, prev);
            updateProductInstanceProperties(currentProdInstanceID, props);
            return props;
        });
    };

    const handleAdd = (e) => {
        const addToCartEvent = new Event("addToCart", { bubbles: true });

        addToCart(productID, selectedProperties);
        setCount((prev) => prev + 1);

        e.target.dispatchEvent(addToCartEvent);
    };

    const handleReduce = (e) => {
        const removeFromCartEvent = new Event("removeFromCart", { bubbles: true });

        reduceProductCount(productID, selectedProperties);
        setCount((prev) => prev - 1);

        e.target.dispatchEvent(removeFromCartEvent);
    };

    useEffect(() => {
        setCount(itemCount);
        getProductByID(productID).then((details) => setDetails(details));

        const product = getProductFromCart(productID, properties);
        setSelectedProps(product.properties);
    }, []);

    return (
        <div className="cartItem">
            <img src={productDetails?.imageUrl} alt="product" />
            <div className="cartItem-description">
                <p className="cartItem-description-header">{productDetails?.name}</p>
                <PropertySelector
                    properties={productDetails?.colorThemes}
                    selectedValue={selectedProperties?.colorThemes}
                    propertyType={"colorThemes"}
                    onPropertyUpdate={handleUpdateProperties}
                />
                <p className="cartItem-description-price">${productDetails?.price}</p>
            </div>
            <div className="cartItem-productCountArea">
                <button className="cartItem-productCountArea-add" onClick={handleAdd}>
                    +
                </button>
                <p className="cartItem-count">{count}</p>
                <button className="cartItem-productCountArea-reduce" onClick={handleReduce}>
                    -
                </button>
            </div>
        </div>
    );
}
