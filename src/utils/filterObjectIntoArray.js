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
        } else if (key === "price") {
            result = [
                ...result,
                where("price", ">=", filterObject[key]["minPrice"]),
                where("price", "<=", filterObject[key]["maxPrice"]),
            ];
        }
    });

    return result;
}
