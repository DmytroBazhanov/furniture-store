import { ReactComponent as HeartSVG } from "../../assets/Heart.svg";
import { ReactComponent as FilledHeartSVG } from "../../assets/FilledHeart.svg";

import "./likeButton.scss";

export default function LikeButton({ likeCount, isActive, onLike }) {
    return (
        <div className="likeButtonHolder">
            <button className="likeCounter" onClick={onLike}>
                {isActive ? <FilledHeartSVG /> : <HeartSVG />}
                <span className="number">{likeCount}</span>
            </button>
            <span className="number">{likeCount}</span>
        </div>
    );
}
