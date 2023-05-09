import ProductShowcase from "../../components/productShowcase/ProductShowcase";

import { useState, useEffect } from "react";
import { getProductLimit } from "./config";
import { getFilteredProducts } from "../../queries/products";
import { useParams } from "react-router-dom";
import { where } from "firebase/firestore";
import { switcherButtons, viewModes } from "./config";
import { filters as DefaultFilters } from "../../components/productFilters/config";

import ProductFilters from "../../components/productFilters/ProductFilters";
import Switcher from "../../components/switcher/Switcher";

import "./plp.scss";
import ProductSort from "../../components/productSort/ProductSort";

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

    const getProducts = (sortFunctions = [], ignoreSnapshot = false, ignoreLimit = false) => {
        const width = window.innerWidth;
        const productLimit = ignoreLimit ? products.length : getProductLimit(width);
        const snapshot = ignoreSnapshot ? null : lastFirebaseSnapshot;

        getFilteredProducts(snapshot, productLimit, [
            where("category", "==", categoryID),
            ...sortFunctions,
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
                <ProductSort getProducts={getProducts} />
                <Switcher buttons={viewSwitcherButtons} currentState={viewMode} />
            </div>
            <div className="productArea">
                <ProductFilters getProducts={getProducts} filters={DefaultFilters} />
                <ProductShowcase products={products} viewMode={viewModes[viewMode]} />
            </div>
        </div>
    );
}
