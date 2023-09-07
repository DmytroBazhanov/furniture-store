import CheckoutForm from "../../components/checkoutForm/CheckoutForm";
import CheckoutItems from "../../components/checkoutItems/CheckoutItems";
import getProducts from "../../utils/getProducts";

import { getProductsFromCart } from "../../utils/cart";
import { getProductByID } from "../../queries/products";
import { useState, useEffect } from "react";

import "./checkout.scss";

export default function Checkout() {
    const [products, setProducts] = useState([]);

    const getDetails = (cartProducts) => {
        const requestArray = cartProducts.map(async (prod) => {
            return getProductByID(prod.productID);
        });

        return requestArray;
    };

    useEffect(() => {
        const cartProducts = getProductsFromCart();

        Promise.all(getDetails(cartProducts)).then((productsDetail) => {
            setProducts(getProducts(cartProducts, productsDetail));
        });
    }, []);

    return (
        <div className="checkout-page">
            <CheckoutForm />
            <CheckoutItems items={products} />
        </div>
    );
}
