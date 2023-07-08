import { useState, useEffect } from "react";
import { getProductLimit } from "./config";
import { getFilteredProducts } from "../../queries/products";
import { useParams } from "react-router-dom";
import { where } from "firebase/firestore";
import { switcherButtons, viewModes } from "./config";
import { filters as DefaultFilters } from "../../components/productFilters/config";
import { createContext } from "react";

import ProductFilters from "../../components/productFilters/ProductFilters";
import Switcher from "../../components/switcher/Switcher";
import ProductShowcase from "../../components/productShowcase/ProductShowcase";
import ProductSort from "../../components/productSort/ProductSort";

import "./plp.scss";
import { filterObjecttIntoArray } from "../../utils/filterObjectIntoArray";
import PriceRange from "../../components/priceRange/PriceRange";

export const FilterContext = createContext(null);

export default function ProductListingPage() {
    //flags
    const [firstLoad, setFirstLoad] = useState(true);
    // states
    const [products, setProducts] = useState([]);
    const [lastFirebaseSnapshot, setSnapshot] = useState(null);
    const [viewMode, setViewMode] = useState("card");
    const [filters, setFilters] = useState({});

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
        if (!firstLoad) {
            getProducts(filterObjecttIntoArray(filters), true);
            console.log("filtered products");
        }
        setFirstLoad(false);
    }, [filters]);

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="ProductListingPage">
            <FilterContext.Provider value={{ filters: filters, setFilters: setFilters }}>
                <div className="sortArea">
                    <ProductSort getProducts={getProducts} />
                    <Switcher buttons={viewSwitcherButtons} currentState={viewMode} />
                </div>
                <div className="productArea">
                    <ProductFilters getProducts={getProducts} filters={DefaultFilters} />
                    <ProductShowcase products={products} viewMode={viewModes[viewMode]} />
                </div>
            </FilterContext.Provider>
        </div>
    );
}
