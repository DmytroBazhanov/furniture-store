import { ReactComponent as HeartSVG } from "../../assets/Heart.svg";
import { ReactComponent as FilledHeartSVG } from "../../assets/FilledHeart.svg";

import "./productHeader.scss";

export default function ProductHeader({ name, manufacturer, likes, isLiked, onLike }) {
    return (
        <div className="productHeader">
            <div className="header">
                <h1 className="headerText">{name}</h1>
                <button className="likeCounter" onClick={onLike}>
                    {isLiked ? <FilledHeartSVG /> : <HeartSVG />}
                    {likes}
                </button>
            </div>
            <div className="manufacturerName">{manufacturer}</div>
        </div>
    );
}
