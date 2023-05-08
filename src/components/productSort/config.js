import { orderBy } from "firebase/firestore";

export const sortOptions = [
    {
        id: "A-Z",
        text: "A-Z",
        sortFunctions: [orderBy("name", "asc")],
    },
    {
        id: "Z-A",
        text: "Z-A",
        sortFunctions: [orderBy("name", "desc")],
    },
    {
        id: "cheapToExpencive",
        text: "From cheap to expensive",
        sortFunctions: [orderBy("price", "asc")],
    },
    {
        id: "expenciveToCheap",
        text: "From expensive to cheap",
        sortFunctions: [orderBy("price", "desc")],
    },
    {
        id: "bestRated",
        text: "Best rated",
        sortFunctions: [orderBy("recomendationCount", "desc")],
    },
    {
        id: "mostReviewed",
        text: "Most reviwed",
        sortFunctions: [orderBy("reviewCount", "desc")],
    },
];
