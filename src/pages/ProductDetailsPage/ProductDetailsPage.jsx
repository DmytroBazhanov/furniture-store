import { useState, useEffect } from "react";
import { getProductID, removeProductID } from "../../utils/productID";
import { getProductByID, likeProduct, removeLike } from "../../queries/products";

import "./productDetailsPage.scss";
import ProductHeader from "../../components/productHeader/ProductHeader";
import ColorPicker from "../../components/colorPicker/ColorPicker";

export default function ProductDetailsPage() {
    const [productDetails, setDetails] = useState(null);
    const [chosenColor, setColor] = useState(null);

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

    useEffect(() => {
        const prodID = getProductID();
        getProductByID(prodID).then((response) => {
            setDetails(response);
        });

        // commented because of dev mode, in production should not be commented
        // return () => {
        //     removeProductID();
        // };
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
            <ColorPicker
                themes={productDetails.colorThemes}
                chosenColor={chosenColor}
                setColor={setColor}
            />
        </div>
    );
}
