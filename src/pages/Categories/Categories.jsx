import CategotyCard from "../../components/CategoryCard/CategoryCard";
import { getCategories } from "../../queries/categories";
import { useEffect, useState } from "react";

import "./categories.scss";

export default function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then((response) => setCategories(response));
    }, []);

    return (
        <div className="categoryPage">
            {categories.map((category) => (
                <CategotyCard key={category.id} name={category.id} backgroundImage={category.img} />
            ))}
        </div>
    );
}
