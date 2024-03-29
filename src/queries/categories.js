import { db } from "../firebase";
import { collection, query, getDocs, where, limit } from "firebase/firestore";

export async function getCategories() {
    const categoriesRef = collection(db, import.meta.env.VITE_CATEGORIES);
    const categoriesSnapshot = await getDocs(categoriesRef);

    const categories = categoriesSnapshot.docs.map((category) => {
        return {
            id: category.id,
            img: category.data().image,
        };
    });
    return categories;
}

export async function getProductsFromCategory(categoryID, limitNumber, filters = []) {
    const productsCollection = collection(db, import.meta.env.VITE_PRODUCT_COLLECTION);
    const productsQuery = query(
        productsCollection,
        where("category", "==", categoryID),
        limit(limitNumber),
        ...filters
    );

    const products = (await getDocs(productsQuery)).docs.map((product) => {
        return { id: product.id, data: product.data() };
    });

    return products;
}
