import { useEffect, useRef, useState } from "react";
import { auth } from "../../firebase";
import { getPurchaseHistory } from "../../queries/purchases";
import { RECORD_LIMIT_PER_REQUEST } from "./config";

import IntersectionDetector from "../intersectionDetector/IntersectionDetector";
import EmptyContainerPlaceholder from "../emptyContainerPlaceholder/EmptyContainerPlaceholder";
import secondsToDate from "../../utils/secondsToDate";

import "./purchaseHistory.scss";

export default function PurchaseHistory() {
    const [history, setHistory] = useState([]);
    const [isIntersectorActive, setActive] = useState(false);

    const querySnapshotRef = useRef(null);

    const loadPurchaseHistory = (ignorePrevData) => {
        getPurchaseHistory(querySnapshotRef.current, RECORD_LIMIT_PER_REQUEST).then((response) => {
            if (ignorePrevData) setHistory(response.records);
            else if (!ignorePrevData) setHistory((prev) => [...prev, ...response.records]);

            querySnapshotRef.current = response.lastSnapshot;

            if (response.records.length < 8) setActive(false);
            else setActive(true);
        });
    };

    const renderOperationDateForMobile = (purchase) => {
        const result = secondsToDate(purchase.date.seconds, true);

        return result.map((dateChunk, index) => <span key={index}>{dateChunk}</span>);
    };

    useEffect(() => {
        auth.onAuthStateChanged(() => {
            loadPurchaseHistory(true);
        });
    }, []);

    return (
        <div className="purchase-history">
            <h1 className="purchase-history__header">
                <span className="purchase-history__username">
                    {auth?.currentUser?.displayName}'s
                </span>{" "}
                <span className="purchase-history__header-text">order history</span>
            </h1>
            <div className="purchase-history__border-container">
                <div className={`purchaseHistoryContainer ${!history.length && "borderless"}`}>
                    {!history.length && <EmptyContainerPlaceholder text="Order history is empty" />}
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
                                <h3 className={`ProductRow-header`}>{purchase.productName}</h3>
                                <div className={`ProductRow-info`}>
                                    <p className={`ProductRow-price`}>
                                        $ {purchase.operationPrice}
                                    </p>
                                    <p className={`ProductRow-stock mobile`}>
                                        {renderOperationDateForMobile(purchase)}
                                    </p>
                                    <p className={`ProductRow-stock desktop`}>
                                        {secondsToDate(purchase.date.seconds)}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                    <IntersectionDetector
                        id="historyIntersector"
                        isActive={isIntersectorActive}
                        onIntersect={loadPurchaseHistory}
                    />
                </div>
            </div>
        </div>
    );
}
