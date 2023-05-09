import Filter from "./Filter";
import FilterGroup from "./FilterGroup";

import "./productFilters.scss";

export default function ProductFilters({ filters, getProducts }) {
    return (
        <div className="ProductFilters">
            {filters.map((filter) => (
                <FilterGroup
                    key={filter.id}
                    name={filter.filterGroupName}
                    filters={filter.getProps}
                    getProducts={getProducts}
                />
            ))}
        </div>
    );
}
