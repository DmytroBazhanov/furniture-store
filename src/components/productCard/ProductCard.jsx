import Tooltip from "../tooltip/Tooltip";

import { ReactComponent as SaleSign } from "../../assets/SaleSign.svg";
import { saveProductID } from "../../utils/productID";
import { Link } from "react-router-dom";

import "./productCard.scss";

export default function ProductCard({ id, name, price, inStock, imageUrl, originalPrice, mode }) {
    const saleSign = originalPrice > price ? <SaleSign className={`${mode}-saleSign`} /> : null;

    const handleIDSave = () => saveProductID(id);

    return (
        <Link className={`productLink-${mode}`} to={name} onClick={handleIDSave}>
            <div className={mode}>
                <div className={`${mode}-imageHolder`}>
                    <img className={`${mode}-image`} alt="product" src={imageUrl} />
                </div>
                <Tooltip text={name} disableIfToSmall={true}>
                    <h3 className={`${mode}-header`}>{name}</h3>
                </Tooltip>
                <div className={`${mode}-info`}>
                    <p className={`${mode}-price`}>
                        ${originalPrice !== price ? price : originalPrice}
                    </p>
                    {saleSign}
                    <p className={`${mode}-stock ${inStock ? "present" : "absent"}`}>
                        {inStock ? "Present" : "Absent"}
                    </p>
                </div>
            </div>
        </Link>
    );
}
