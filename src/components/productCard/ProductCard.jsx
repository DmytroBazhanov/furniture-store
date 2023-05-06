import Tooltip from "../tooltip/Tooltip";

import { ReactComponent as SaleSign } from "../../assets/SaleSign.svg";
import { Link } from "react-router-dom";

import "./productCard.scss";

export default function ProductCard({ id, name, price, inStock, imageUrl, salePrice = 0, mode }) {
    const saleSign = salePrice !== 0 ? <SaleSign className={`${mode}-saleSign`} /> : null;

    return (
        <Link className={`productLink-${mode}`} to={name}>
            <div className={mode}>
                <div className={`${mode}-imageHolder`}>
                    <img className={`${mode}-image`} alt="product" src={imageUrl} />
                </div>
                <Tooltip text={name} disableIfToSmall={true}>
                    <h3 className={`${mode}-header`}>{name}</h3>
                </Tooltip>
                <div className={`${mode}-info`}>
                    <p className={`${mode}-price`}>${salePrice !== 0 ? salePrice : price}</p>
                    {saleSign}
                    <p className={`${mode}-stock ${inStock ? "present" : "absent"}`}>
                        {inStock ? "Present" : "Absent"}
                    </p>
                </div>
            </div>
        </Link>
    );
}
