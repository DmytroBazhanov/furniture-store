import ProductCard from "../productCard/ProductCard";
import "./showcase.scss";

export default function ProductShowcase({ products }) {
    return (
        <div className="productShowcase">
            {products.map((prod) => (
                <ProductCard
                    key={prod.id}
                    id={prod.id}
                    name={prod.name}
                    price={prod.price}
                    inStock={prod.inStock}
                    imageUrl={prod.imageUrl}
                    salePrice={prod.salePrice}
                />
            ))}
        </div>
    );
}
