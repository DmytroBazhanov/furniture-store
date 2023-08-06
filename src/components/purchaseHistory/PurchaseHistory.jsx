import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { bulkPurchases, getPurchaseHistory } from "../../queries/purchases";

import EmptyContainerPlaceholder from "../emptyContainerPlaceholder/EmptyContainerPlaceholder";
import Tooltip from "../tooltip/Tooltip";
import secondsToDate from "../../utils/secondsToDate";

import "./purchaseHistory.scss";

export default function PurchaseHistory() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        auth.onAuthStateChanged(() => {
            getPurchaseHistory().then((response) => setHistory(response));
        });
    }, []);

    return (
        <div className="purchaseHistoryContainer">
            {/* <button onClick={() => bulkPurchases()}>Process DB bulk</button> */}
            {!history.length && <EmptyContainerPlaceholder text="Order history is empty" />}
            <div className="holder">
                {history.map((purchase) => {
                    return (
                        <div key={purchase.id} className="ProductRow">
                            <div className={`ProductRow-imageHolder`}>
                                <img
                                    className={`ProductRow-image`}
                                    alt="product"
                                    src={purchase.imageURL}
                                />
                            </div>
                            <Tooltip text={purchase.productName} disableIfToSmall={true}>
                                <h3 className={`ProductRow-header`}>{purchase.productName}</h3>
                            </Tooltip>
                            <div className={`ProductRow-info`}>
                                <p className={`ProductRow-price`}>$ {purchase.operationPrice}</p>
                                <p className={`ProductRow-stock`}>
                                    {secondsToDate(purchase.date.seconds)}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
