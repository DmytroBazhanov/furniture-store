import ProductShowcase from "../../components/productShowcase/ProductShowcase";

import { useState, useEffect } from "react";
import { getProductLimit } from "./config";
import { getFilteredProducts } from "../../queries/products";
import { useParams } from "react-router-dom";
import { where } from "firebase/firestore";

import "./plp.scss";

export default function ProductListingPage() {
    const [products, setProducts] = useState([]);
    const [lastFirebaseSnapshot, setSnapshot] = useState(null);

    const { categoryID } = useParams();

    const getProducts = () => {
        const width = window.innerWidth;
        const productLimit = getProductLimit(width);

        getFilteredProducts(lastFirebaseSnapshot, productLimit, [
            where("category", "==", categoryID),
        ]).then(({ products, lastProductFirebaseSnapshot }) => {
            setProducts(products);
            setSnapshot(lastProductFirebaseSnapshot);
        });
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="ProductListingPage">
            <ProductShowcase products={products} />
        </div>
    );
}
