export default function CheckoutItem({ item }) {
    const price = item.price ? item.price : item.originalPrice;
    const fullPrice = price * item.count;

    return (
        <div className="checkout-item">
            <img className="checkout-item__image" src={item.imageUrl} />
            <div className="checkout-item__item-info">
                <p className="checkout-item__name">{item.name}</p>
                <div className="checkout-item__color">
                    Chosen color theme:{" "}
                    <div
                        className="checkout-item__color-theme"
                        style={{ backgroundColor: item.colorTheme }}
                    ></div>
                </div>
                <p className="checkout-item__price">
                    Price: <span className="checkout-item__price-holder">{price}$</span>
                </p>
                <p className="checkout-item__count">
                    Pieces ordered: <span>{item.count}</span>
                </p>
                <p className="checkout-item__item-total">
                    Total for this item: <span>{fullPrice.toFixed(2)}$</span>
                </p>
            </div>
        </div>
    );
}
