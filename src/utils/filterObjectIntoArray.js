import { where } from "firebase/firestore";

export function filterObjecttIntoArray(filterObject) {
    let result = [];

    Object.keys(filterObject).forEach((key) => {
        if (key === "filters" && filterObject[key].length > 0) {
            result = [...result, where("type", "in", filterObject[key])];
        } else if (key === "sortFunctions") {
            result = [...result, ...filterObject[key]];
        } else if (key === "inStock") {
            result = [...result, filterObject[key]];
        } else if (key === "sortingPrice") {
            // { ..., sortingPrice: [min, max] }
            result = [
                ...result,
                where("price", ">=", filterObject[key][0]),
                where("price", "<=", filterObject[key][1]),
            ];
        }
    });

    return result;
}
