import { getProductTypes } from "../../queries/filters";

export const filters = [
    {
        id: "prodType",
        filterGroupName: "Product type",
        getProps: getProductTypes,
    },
    {
        id: "prodStatus",
        filterGroupName: "Product status",
        getProps: () => [{ id: "productStatus", name: "inStock", alias: "Present in stock" }],
    },
];
