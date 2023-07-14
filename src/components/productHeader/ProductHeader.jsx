import LikeButton from "../likeButton/LikeButton";
import "./productHeader.scss";

export default function ProductHeader({ name, manufacturer, likes, isLiked, onLike }) {
    return (
        <div className="productHeader">
            <div className="header">
                <h1 className="headerText">{name}</h1>
                <LikeButton likeCount={likes} isActive={isLiked} onLike={onLike} />
            </div>
            <div className="manufacturerName">{manufacturer}</div>
        </div>
    );
}
