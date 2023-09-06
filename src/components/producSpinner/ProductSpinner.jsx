import "./productSpinner.scss";

export default function ProductSpinner() {
    return (
        <div className="product-spinner">
            <div className="product-spinner__information">
                <div className="product-spinner__header-template"></div>
                <div className="product-spinner__color-template"></div>
                <div className="product-spinner__description-template"></div>
                <div className="product-spinner__gallery-mobile"></div>
                <div className="product-spinner__buy-template"></div>
            </div>
            <div className="product-spinner__gallery"></div>
        </div>
    );
}
