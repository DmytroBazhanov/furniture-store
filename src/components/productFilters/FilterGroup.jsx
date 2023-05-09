import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Filter from "./Filter";

import "./productFilters.scss";

export default function FilterGroup({ name, filters, getProducts }) {
    const [filterProperties, setProperties] = useState([]);

    const { categoryID } = useParams();

    useEffect(() => {
        if (filters.constructor.name === "AsyncFunction") {
            filters(categoryID).then((result) => {
                setProperties(result);
            });
        } else {
            setProperties(filters());
        }
    }, []);

    return (
        <div className="filterGroup">
            <h5 className="filterGroupName">{name}</h5>
            <div className="filters">
                {filterProperties.map((prop) => {
                    return (
                        <Filter
                            key={prop.id}
                            id={prop.id}
                            name={prop.name}
                            alias={prop.alias}
                            getProducts={getProducts}
                        />
                    );
                })}
            </div>
        </div>
    );
}
