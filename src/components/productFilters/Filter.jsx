import { useContext } from "react";
import { where } from "firebase/firestore";
import { FilterContext } from "../../pages/ProductListingPage/ProductListingPage";

import "./productFilters.scss";

export default function Filter({ id, name, alias, getProducts }) {
    const { setFilters } = useContext(FilterContext);

    const handleChange = (event) => {
        const state = event.target.checked;

        // if (state) setFilters((prev) => [...prev, { name: name, func: where("type", "==", name) }]);
        if (state) {
            if (name === "inStock") {
                setFilters((prev) => {
                    return {
                        ...prev,
                        [name]: where("inStock", "==", state),
                    };
                });

                return;
            }
            setFilters((prev) => {
                const filters = prev.filters ? prev.filters : [];

                return {
                    ...prev,
                    filters: [...filters, name],
                };
            });
        } else
            setFilters((prev) => {
                const newFiltersObject = { ...prev };
                if (newFiltersObject.filters) {
                    newFiltersObject.filters = newFiltersObject.filters.filter(
                        (filterName) => filterName !== name
                    );

                    if (newFiltersObject.filters.length === 0) delete newFiltersObject.filters;
                }
                delete newFiltersObject[name];

                return newFiltersObject;
            });
        // if (state) getProducts([where("type", "==", name)], true);
        // else getProducts([], true);
    };

    return (
        <div className="filter" id={id}>
            <label>{alias}</label>
            <input type="checkbox" onChange={handleChange} />
        </div>
    );
}
