import Tooltip from "../tooltip/Tooltip";

import { ReactComponent as SaleSign } from "../../assets/SaleSign.svg";
import { Link } from "react-router-dom";

import "./productCard.scss";

export default function ProductCard({ id, name, price, inStock, imageUrl, salePrice = 0 }) {
    const saleSign = salePrice !== 0 ? <SaleSign className="ProductCard-saleSign" /> : null;

    return (
        <Link className="productLink" to={name}>
            <div className="ProductCard">
                <div className="ProductCard-imageHolder">
                    <img className="ProductCard-image" alt="product" src={imageUrl} />
                </div>
                <Tooltip text={name} disableIfToSmall={true}>
                    <h3 className="ProductCard-header">{name}</h3>
                </Tooltip>
                <div className="ProductCard-info">
                    <p className="ProductCard-price">$ {salePrice !== 0 ? salePrice : price}</p>
                    {saleSign}
                    <p className={`ProductCard-stock ${inStock ? "present" : "absent"}`}>
                        {inStock ? "Present" : "Absent"}
                    </p>
                </div>
            </div>
        </Link>
    );
}

// Add tooltip for name
// Hide name overflow
// Add sale price and sign

// Turn product card into link
// Add responsiveness
