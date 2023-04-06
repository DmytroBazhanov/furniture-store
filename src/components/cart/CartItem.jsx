import "./cart.scss";
import { getProductByID } from "../../queries/products";
import { useState, useEffect } from "react";
import PropertySelector from "../propertySelector/PropertySelector";
import {
    addToCart,
    findProduct,
    reduceProductCount,
    updateProductInstanceProperties,
} from "../../utils/cart";
import Tooltip from "../tooltip/Tooltip";

const updateProductEvent = new Event("updateProductInCart", { bubbles: true });

export default function CartItem({ productID, itemCount, properties }) {
    const [productDetails, setDetails] = useState(null);

    const handleUpdateProperties = (event, newProps) => {
        const props = { ...properties, ...newProps };
        const productInCartID = findProduct(productID, props);

        if (productInCartID !== -1) return;

        const currentProdInstanceID = findProduct(productID, properties);
        updateProductInstanceProperties(currentProdInstanceID, props);

        event.target.dispatchEvent(updateProductEvent);
    };

    const handleAdd = (e) => {
        addToCart(productID, properties);

        e.target.dispatchEvent(updateProductEvent);
    };

    const handleReduce = (e) => {
        reduceProductCount(productID, properties);

        e.target.dispatchEvent(updateProductEvent);
    };

    useEffect(() => {
        getProductByID(productID).then((details) => setDetails(details));
    }, []);

    return (
        <div className="cartItem">
            <img src={productDetails?.imageUrl} alt="product" />
            <div className="cartItem-description">
                <Tooltip text={productDetails?.name} disableIfToSmall={true}>
                    <p className="cartItem-description-header">{productDetails?.name}</p>
                </Tooltip>
                <PropertySelector
                    properties={productDetails?.colorThemes}
                    selectedValue={properties?.colorThemes}
                    propertyType={"colorThemes"}
                    onPropertyUpdate={handleUpdateProperties}
                />
                <p className="cartItem-description-price">${productDetails?.price}</p>
            </div>
            <div className="cartItem-productCountArea">
                <button className="cartItem-productCountArea-add" onClick={handleAdd}>
                    +
                </button>
                <p className="cartItem-count">{itemCount}</p>
                <button className="cartItem-productCountArea-reduce" onClick={handleReduce}>
                    -
                </button>
            </div>
        </div>
    );
}
