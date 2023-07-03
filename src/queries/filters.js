import { collection, query, getDocs, where, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase";

export const getProductTypes = async (category) => {
    const targetCollection = collection(db, import.meta.env.VITE_PRODUCT_TYPES);
    const collectionQuery = query(targetCollection, where("category", "==", category));

    const productTypes = await getDocs(collectionQuery);
    return productTypes.docs.map((type) => {
        return { id: type.id, name: type.data().name, alias: type.data().alias };
    });
};

export const getEdgePrices = async (category) => {
    const targetCollection = collection(db, import.meta.env.VITE_PRODUCT_COLLECTION);
    const collectionQueryMax = query(
        targetCollection,
        where("category", "==", category),
        orderBy("price", "desc"),
        limit(1)
    );

    const collectionQueryMin = query(
        targetCollection,
        where("category", "==", category),
        orderBy("price", "asc"),
        limit(1)
    );

    const maxPrice = await getDocs(collectionQueryMax);
    const minPrice = await getDocs(collectionQueryMin);

    return [minPrice.docs[0].data().price, maxPrice.docs[0].data().price];
};
