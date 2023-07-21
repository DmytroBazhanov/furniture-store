import { useContext } from "react";
import { where } from "firebase/firestore";
import { FilterContext } from "../../pages/ProductListingPage/ProductListingPage";

import "./productFilters.scss";

export default function Filter({ id, name, alias }) {
    const { setFilters, filters } = useContext(FilterContext);

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
        } else {
            if (name === "inStock") {
                setFilters((prev) => {
                    const newFilters = { ...prev };
                    delete newFilters[name];

                    return newFilters;
                });

                return;
            }

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
        }
    };

    const handleValue = () => {
        if (name === "inStock") {
            return !!filters?.inStock;
        } else {
            return !!filters?.filters?.includes(name);
        }
    };

    return (
        <div className="filter" id={id}>
            <input type="checkbox" onChange={handleChange} checked={handleValue() || ""} />
            <label>{alias}</label>
        </div>
    );
}
