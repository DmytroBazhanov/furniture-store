import { auth, db } from "../firebase";
import { doc, getDocs, collection, query, where, updateDoc } from "firebase/firestore";

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
