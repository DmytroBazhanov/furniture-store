export default function Slide({ image, onClick }) {
    return (
        <div className="slideContainer">
            <img className="slide" src={image} onClick={onClick} />
        </div>
    );
}
