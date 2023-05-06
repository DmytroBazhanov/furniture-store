import CardSign from "../../assets/CardSign.svg";
import ListSing from "../../assets/ListSign.svg";

const DESKTOP_REQUEST_LIMIT = 8;
const LAPTOP_REQUEST_LIMIT = 8;
const TABLET_REQUEST_LIMIT = 8;
const MOBILE_REQUEST_LIMIT = 4;

const MIN_DESKTOP_WIDTH = 1441;
const MIN_LAPTOP_WIDTH = 1201;
const MIN_TABLET_WIDTH = 551;

export const getProductLimit = (viewportWidth) => {
    if (MIN_DESKTOP_WIDTH <= viewportWidth) return DESKTOP_REQUEST_LIMIT;
    else if (MIN_LAPTOP_WIDTH <= viewportWidth) return LAPTOP_REQUEST_LIMIT;
    else if (MIN_TABLET_WIDTH <= viewportWidth) return TABLET_REQUEST_LIMIT;
    else if (MIN_TABLET_WIDTH > viewportWidth) return MOBILE_REQUEST_LIMIT;
};

export const switcherButtons = [
    { id: "grid", content: <img className="switcherImg" src={ListSing} /> },
    { id: "card", content: <img className="switcherImg" src={CardSign} /> },
];

export const viewModes = {
    card: "ProductCard",
    grid: "ProductRow",
};
