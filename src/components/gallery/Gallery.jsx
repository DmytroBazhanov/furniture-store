import Slide from "./Slide";
import "./gallery.scss";

export default function Gallery({ slides, mainSlide, className = "" }) {
    return (
        <div className={`galleryContainer ${className}`}>
            <div className="slideTapeContainer">
                <div className="slideTape">
                    {slides.map((slide) => (
                        <Slide key={slide} image={slide} />
                    ))}
                </div>
            </div>
            <div className="mainSlideContainer">
                <img className="mainSlide" src={mainSlide} />
            </div>
        </div>
    );
}
