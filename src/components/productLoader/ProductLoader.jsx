import { ReactComponent as LoadMoreSVG } from "../../assets/LoadMore.svg";
import IntersectionDetector from "../intersectionDetector/IntersectionDetector";

import "./prouctLoader.scss";

export default function ProductLoader({ onLoad }) {
    return (
        <IntersectionDetector onIntersect={onLoad} id="productLoader">
            <p className="productLoader">
                <LoadMoreSVG />
                <span>Loading more products</span>
            </p>
        </IntersectionDetector>
    );
}
