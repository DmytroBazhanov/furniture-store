import ProductCard from "../productCard/ProductCard";

import "./showcase.scss";

export default function ProductShowcase({ products, viewMode = "ProductCard" }) {
    return (
        <div className={`productShowcase-${viewMode}`}>
            {products.map((prod) => (
                <ProductCard
                    key={prod.id}
                    id={prod.id}
                    name={prod.name}
                    price={prod.price}
                    inStock={prod.inStock}
                    imageUrl={prod.imageUrl}
                    originalPrice={prod.originalPrice}
                    mode={viewMode}
                />
            ))}
        </div>
    );
}
