export default function Slide({ image, onClick }) {
    return <img className="slide" src={image} onClick={onClick} />;
}
