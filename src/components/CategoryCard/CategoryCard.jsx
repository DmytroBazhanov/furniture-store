import { Link } from "react-router-dom";
import { links } from "../../utils/links";

import "./categoryCard.scss";

export default function CategotyCard({ name, backgroundImage }) {
    const image = { backgroundImage: `url(${backgroundImage})` };

    const categoryLink = `${links.navigationLinks[0].src}/${name}`;

    return (
        <Link className="categoryLink" to={categoryLink}>
            <div className="categoryCard" style={image}>
                {name}
            </div>
        </Link>
    );
}
