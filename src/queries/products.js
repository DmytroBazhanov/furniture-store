import { db } from "../firebase";
import { auth } from "../firebase";
import {
    collection,
    query,
    limit,
    doc,
    getDoc,
    getDocs,
    updateDoc,
    arrayUnion,
    startAfter,
} from "firebase/firestore";

export async function getProductByID(id) {
    const docRef = doc(db, import.meta.env.VITE_PRODUCT_COLLECTION, id);
    const product = await getDoc(docRef);

    if (product.exists()) {
        const data = product.data();
        const likesAmount = data.likes?.length ?? 0;

        return { ...data, likes: likesAmount };
    }

    throw new Error("Product doesnt exist", `No product found with id - ${id}`);
}

export async function getProductsWithPagination(lastProduct, productLimit) {
    const collectionRef = collection(db, import.meta.env.VITE_PRODUCT_COLLECTION);
    let collectionQuery = null;

    if (lastProduct === null) {
        collectionQuery = query(collectionRef, limit(productLimit));
    } else {
        collectionQuery = query(collectionRef, limit(productLimit), startAfter(lastProduct));
    }

    const productsCollection = await getDocs(collectionQuery);

    if (productsCollection.docs.length === 0 && lastProduct === null) {
        throw new Error(
            "Empty collection",
            "Response received but the collection is empty, it is possible that collection name was specified wrongly"
        );
    }

    const products = [];

    productsCollection.forEach((prod) => {
        const likesAmount = prod.data().likes?.length ?? 0;

        products.push({
            id: prod.id,
            ...prod.data(),
            likes: likesAmount,
        });
    });

    const lastDoc = productsCollection.docs[productsCollection.docs.length - 1];

    return {
        products,
        lastProductFirebaseSnapshot: lastDoc,
    };
}

export async function likeProduct(productID) {
    if (!auth?.currentUser?.uid) return;

    const userProfileRef = doc(db, import.meta.env.VITE_PROFILES, auth.currentUser.uid);
    const productRef = doc(db, import.meta.env.VITE_PRODUCT_COLLECTION, productID);
    await updateDoc(productRef, {
        likes: arrayUnion(userProfileRef),
    });
}
