import CategotyCard from "../../components/CategoryCard/CategoryCard";
import { getCategories } from "../../queries/categories";
import { useEffect, useState } from "react";

import "./categories.scss";

export default function Categories() {
    const [isOnline, setOnline] = useState(true);
    const [categories, setCategories] = useState([]);

    const onNetworkStateChange = () => setOnline(navigator.onLine);

    useEffect(() => {
        onNetworkStateChange();

        window.addEventListener("online", onNetworkStateChange);
        window.addEventListener("offline", onNetworkStateChange);

        return () => {
            window.removeEventListener("online", onNetworkStateChange);
            window.removeEventListener("offline", onNetworkStateChange);
        };
    }, []);

    useEffect(() => {
        getCategories().then((response) => setCategories(response));
    }, [isOnline]);

    if (!isOnline)
        return (
            <div className="productDetailsPage">
                <h3 className="noInternet">No internet connection detected</h3>
            </div>
        );

    return (
        <div className="categoryPage">
            {categories.map((category) => (
                <CategotyCard key={category.id} name={category.id} backgroundImage={category.img} />
            ))}
        </div>
    );
}
