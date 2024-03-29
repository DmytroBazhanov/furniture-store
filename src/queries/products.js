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
    getCountFromServer,
    arrayRemove,
} from "firebase/firestore";

export async function getProductByID(id) {
    const docRef = doc(db, import.meta.env.VITE_PRODUCT_COLLECTION, id);
    const product = await getDoc(docRef);

    if (product.exists()) {
        const data = product.data();
        const likesAmount = data.likes?.length ?? 0;

        const isLiked = data.likes.includes(auth?.currentUser?.uid);

        return { ...data, likes: likesAmount, id: product.id, isLiked: isLiked };
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

export async function getProductCount() {
    const productCollection = collection(db, import.meta.env.VITE_PRODUCT_COLLECTION);
    const productCount = await getCountFromServer(productCollection);
    return productCount.data().count;
}

export async function getFilteredProducts(lastProduct, productLimit, filterFunctions) {
    {
        const collectionRef = collection(db, import.meta.env.VITE_PRODUCT_COLLECTION);
        let collectionQuery = null;

        if (lastProduct === null) {
            collectionQuery = query(collectionRef, limit(productLimit), ...filterFunctions);
        } else {
            collectionQuery = query(
                collectionRef,
                limit(productLimit),
                ...filterFunctions,
                startAfter(lastProduct)
            );
        }

        const productsCollection = await getDocs(collectionQuery);

        const products = [];

        productsCollection.forEach((prod) => {
            const likesAmount = prod.data().likes?.length ?? 0;

            products.push({
                id: prod.id,
                ...prod.data(),
                likes: likesAmount,
            });
        });

        const lastDoc = productsCollection.docs[productsCollection.docs.length - 1] ?? null;

        return {
            products,
            lastProductFirebaseSnapshot: lastDoc,
        };
    }
}

export async function likeProduct(productID) {
    if (!auth?.currentUser?.uid) return;

    const productRef = doc(db, import.meta.env.VITE_PRODUCT_COLLECTION, productID);
    await updateDoc(productRef, {
        likes: arrayUnion(auth.currentUser.uid),
    });
}

export async function removeLike(productID) {
    if (!auth?.currentUser?.uid) return;

    const productRef = doc(db, import.meta.env.VITE_PRODUCT_COLLECTION, productID);
    await updateDoc(productRef, {
        likes: arrayRemove(auth?.currentUser?.uid),
    });
}
