import { useState, useEffect } from "react";
import { getProductID, removeProductID } from "../../utils/productID";
import { getProductByID, likeProduct, removeLike } from "../../queries/products";

import "./productDetailsPage.scss";
import ProductHeader from "../../components/productHeader/ProductHeader";
import ColorPicker from "../../components/colorPicker/ColorPicker";
import RecomendationArea from "../../components/recomendationArea/RecomendationArea";
import BuyButton from "../../components/buyButton/BuyButton";
import colorThemeSeparator from "../../utils/themeColorSeparator";
import { addToCart } from "../../utils/cart";
import { addProductEvent } from "../../events";

export default function ProductDetailsPage() {
    const [productDetails, setDetails] = useState(null);
    const [chosenColor, setColor] = useState(null);

    const colorsAndThemes = colorThemeSeparator(productDetails?.colorThemes);

    const handleLike = () => {
        if (productDetails.isLiked) {
            removeLike(productDetails.id);
            setDetails((prev) => {
                return {
                    ...prev,
                    likes: prev.likes - 1,
                    isLiked: false,
                };
            });

            return;
        }

        likeProduct(productDetails.id);
        setDetails((prev) => {
            return {
                ...prev,
                likes: prev.likes + 1,
                isLiked: true,
            };
        });
    };

    const handleAddProduct = (event) => {
        const colors = colorsAndThemes.map((obj) => obj.color);
        addToCart(productDetails.id, { colorThemes: chosenColor ?? colors[0] });
        event.target.dispatchEvent(addProductEvent);
    };

    useEffect(() => {
        const prodID = getProductID();
        getProductByID(prodID).then((response) => {
            setDetails(response);
        });
    }, []);

    if (!productDetails) return <h1>Loading</h1>;

    return (
        <div className="productDetailsPage">
            <ProductHeader
                name={productDetails.name}
                manufacturer={"SteelWorks Company Limited"}
                likes={productDetails.likes}
                isLiked={productDetails.isLiked}
                onLike={handleLike}
            />
            <ColorPicker themes={colorsAndThemes} chosenColor={chosenColor} setColor={setColor} />
            <div className="productDescription">
                <h1 className="header">Furniture description:</h1>
                <p className="content">
                    <span>{productDetails.description}</span>
                </p>
            </div>
            <div className="productFooter">
                <RecomendationArea
                    reviewNumber={productDetails.reviewCount}
                    recomendationNumber={productDetails.recomendationCount}
                    recomendationPercentage={productDetails.recomendationPercentage}
                />
                <BuyButton
                    price={productDetails.price}
                    originalPrice={productDetails.originalPrice}
                    onClick={handleAddProduct}
                    isAvailable={productDetails.inStock}
                >
                    Add to cart
                </BuyButton>
            </div>
        </div>
    );
}
