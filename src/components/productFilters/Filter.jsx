import { where } from "firebase/firestore";

import "./productFilters.scss";

export default function Filter({ id, name, alias, getProducts }) {
    const handleChange = (event) => {
        const state = event.target.checked;

        if (state) getProducts([where("type", "==", name)], true);
        else getProducts([], true);
    };

    return (
        <div className="filter" id={id}>
            <label>{alias}</label>
            <input type="checkbox" onChange={handleChange} />
        </div>
    );
}
