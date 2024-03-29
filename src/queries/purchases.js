import { nanoid } from "nanoid";
import { auth, db } from "../firebase";
import {
    doc,
    getDocs,
    collection,
    query,
    where,
    updateDoc,
    setDoc,
    limit,
    startAfter,
} from "firebase/firestore";
import { removeProductFromCart } from "../utils/cart";

export async function getPurchasesForNotifications() {
    const userID = auth.currentUser.uid;
    const purchasesCollection = collection(db, import.meta.env.VITE_PURCHASES);

    const purchasesQuery = query(
        purchasesCollection,
        where("userID", "==", userID),
        where("doNotShow", "==", false)
    );
    const purchases = await getDocs(purchasesQuery);

    return purchases.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
    });
}

export async function hideNotification(notificationID) {
    const notificationRef = doc(db, import.meta.env.VITE_PURCHASES, notificationID);
    await updateDoc(notificationRef, { doNotShow: true });
}

export async function getPurchaseHistory(snapshot, docsLimit) {
    const userID = auth.currentUser.uid;
    const purchasesCollection = collection(db, import.meta.env.VITE_PURCHASES);

    let historyQuery = null;

    if (!snapshot) {
        historyQuery = query(purchasesCollection, where("userID", "==", userID), limit(docsLimit));
    } else if (snapshot) {
        historyQuery = query(
            purchasesCollection,
            where("userID", "==", userID),
            limit(docsLimit),
            startAfter(snapshot)
        );
    }

    const history = await getDocs(historyQuery);

    return {
        records: history.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
        }),
        lastSnapshot: history.docs[history.docs.length - 1],
    };
}

export async function bulkPurchases() {
    const now = new Date();
    const id = nanoid();
    const docRef = doc(db, import.meta.env.VITE_PURCHASES, id);
    const prodRef = doc(db, import.meta.env.VITE_PRODUCT_COLLECTION, "9HwUtcBFohVDKM0mywtm");

    setDoc(docRef, {
        date: now,
        doNotShow: true,
        imageURL:
            "https://firebasestorage.googleapis.com/v0/b/furniture-store-585eb.appspot.com/o/images%2Fbedromm.png?alt=media&token=7b14ec48-174a-4647-aee1-b03e085a1107",
        operationPrice: 4599.99,
        productID: prodRef,
        productName: "Dump product",
        userID: "icuOIIsHMkU1hRnxzpwz6rfmQe52",
    });
}

export async function addPurchase(product) {
    const user = auth.currentUser;
    if (!user) return;

    const price = product.price ? product.price : product.originalPrice;

    console.log(product);
    const now = new Date();
    const id = nanoid();
    const docRef = doc(db, import.meta.env.VITE_PURCHASES, id);
    const prodRef = doc(db, import.meta.env.VITE_PRODUCT_COLLECTION, product.id);

    setDoc(docRef, {
        date: now,
        doNotShow: false,
        imageURL: product.imageUrl,
        operationPrice: (price * product.count).toFixed(2),
        productID: prodRef,
        productName: product.name,
        userID: user.uid,
    });
}
