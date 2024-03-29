import { ReactComponent as StartSVG } from "../../assets/Star.svg";
import { ReactComponent as CommentSVG } from "../../assets/Comment.svg";

import Badge from "../badge/badge";

import "./recomendationArea.scss";

export default function RecomendationArea({
    reviewNumber,
    recomendationNumber,
    recomendationPercentage,
    className = "",
}) {
    return (
        <div className={`recomendationArea ${className}`}>
            <div className="badges">
                <Badge className={"recomendationBadge"} onClick={() => {}}>
                    <StartSVG />
                    <span>{recomendationNumber}</span>
                </Badge>
                <Badge className={"reviewBadge"} onClick={() => {}}>
                    <CommentSVG />
                    <span>{reviewNumber}</span>
                </Badge>
            </div>
            <p className="recomendationPercentage">
                <span>{recomendationPercentage}%</span> of buyers have recommended this product
            </p>
        </div>
    );
}
