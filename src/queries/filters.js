import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../firebase";

export const getProductTypes = async (category) => {
    const targetCollection = collection(db, import.meta.env.VITE_PRODUCT_TYPES);
    const collectionQuery = query(targetCollection, where("category", "==", category));

    const productTypes = await getDocs(collectionQuery);
    return productTypes.docs.map((type) => {
        return { id: type.id, name: type.data().name, alias: type.data().alias };
    });
};
