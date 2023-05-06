import ProductShowcase from "../../components/productShowcase/ProductShowcase";

import { useState, useEffect } from "react";
import { getProductLimit } from "./config";
import { getFilteredProducts } from "../../queries/products";
import { useParams } from "react-router-dom";
import { where } from "firebase/firestore";
import { switcherButtons, viewModes } from "./config";

import ProductFilters from "../../components/productFilters/ProductFilters";
import Switcher from "../../components/switcher/Switcher";

import "./plp.scss";

export default function ProductListingPage() {
    const [products, setProducts] = useState([]);
    const [lastFirebaseSnapshot, setSnapshot] = useState(null);
    const [viewMode, setViewMode] = useState("card");

    const { categoryID } = useParams();

    const changeViewMode = (e) => {
        const viewModeID = e.currentTarget.id;
        setViewMode(viewModeID);
    };

    const viewSwitcherButtons = switcherButtons.map((buttonConfig) => {
        return { ...buttonConfig, function: changeViewMode };
    });

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
            <div className="sortArea">
                <Switcher buttons={viewSwitcherButtons} currentState={viewMode} />
            </div>
            <div className="productArea">
                <ProductFilters />
                <ProductShowcase products={products} viewMode={viewModes[viewMode]} />
            </div>
        </div>
    );
}
