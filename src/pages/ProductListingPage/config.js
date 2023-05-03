const DESKTOP_REQUEST_LIMIT = 8;
const LAPTOP_REQUEST_LIMIT = 6;
const TABLET_REQUEST_LIMIT = 4;
const MOBILE_REQUEST_LIMIT = 2;

const MIN_DESKTOP_WIDTH = 1441;
const MIN_LAPTOP_WIDTH = 1201;
const MIN_TABLET_WIDTH = 551;

export const getProductLimit = (viewportWidth) => {
    switch (viewportWidth) {
        case MIN_DESKTOP_WIDTH <= viewportWidth:
            return DESKTOP_REQUEST_LIMIT;
        case MIN_LAPTOP_WIDTH <= viewportWidth:
            return LAPTOP_REQUEST_LIMIT;
        case MIN_TABLET_WIDTH <= viewportWidth:
            return TABLET_REQUEST_LIMIT;
        case MIN_TABLET_WIDTH > viewportWidth:
            return MOBILE_REQUEST_LIMIT;
    }
};
