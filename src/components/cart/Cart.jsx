import "./cart.scss";
import { ReactComponent as CartSvg } from "../../assets/Cart.svg";
import { useEffect, useState } from "react";
import { MAX_NUMBER_TO_DISPLAY } from "./config";
import DropdownMenu from "../dropdownMenu/DropdownMenu";
import { getProductNumberInCart, getProductsFromCart } from "../../utils/cart";
import CartItemList from "./CartItemList";

export default function Cart() {
    const [itemsInCartCount, setItemsCount] = useState(0);
    const [products, setProducts] = useState([]);
    const [isVisible, setVisible] = useState(false);

    const cartCount = itemsInCartCount > MAX_NUMBER_TO_DISPLAY ? "9+" : itemsInCartCount;

    const handleProductEdit = () => {
        const updatedProducts = getProductsFromCart();
        setProducts(updatedProducts);
        setItemsCount(getProductNumberInCart());
    };

    useEffect(() => {
        const cartProducts = getProductsFromCart();
        setProducts(cartProducts);
        setItemsCount(getProductNumberInCart());
    }, []);

    useEffect(() => {
        document.addEventListener("updateProductInCart", handleProductEdit);

        return () => {
            document.removeEventListener("updateProductInCart", handleProductEdit);
        };
    });

    const cartList = isVisible ? <CartItemList products={products} /> : null;

    return (
        <DropdownMenu
            dropdownContent={cartList}
            isVisible={isVisible}
            setVisible={setVisible}
            id="cartDropdown"
        >
            <div className="cartPreview">
                <CartSvg />
                {itemsInCartCount > 0 ? <div className="itemCountTag">{cartCount}</div> : null}
            </div>
        </DropdownMenu>
    );
}
