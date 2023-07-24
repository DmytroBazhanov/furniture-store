import { useState, useEffect } from "react";

import Slide from "./Slide";

import "./gallery.scss";

export default function Gallery({ slides, mainSlide, className = "" }) {
    const [activeImage, setActiveImage] = useState("");

    const handleImageChange = (imageUrl) => {
        setActiveImage(imageUrl);
    };

    useEffect(() => {
        setActiveImage(mainSlide);
    }, []);

    return (
        <div className={`galleryContainer ${className}`}>
            <div className="slideTapeContainer">
                <div className="slideTape">
                    {slides.map((slide) => (
                        <Slide key={slide} image={slide} onClick={handleImageChange} />
                    ))}
                </div>
            </div>
            <div className="mainSlideContainer">
                <img className="mainSlide" src={activeImage} />
            </div>
        </div>
    );
}
