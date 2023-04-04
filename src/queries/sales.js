import { db } from "../firebase";
import { collection, query, getDocs, limit, orderBy } from "firebase/firestore";

export async function getCurrentSale() {
    const salesCollection = collection(db, import.meta.env.VITE_SALES);
    const salesQuery = query(salesCollection, limit(1), orderBy("time", "desc"));
    const salesDocs = (await getDocs(salesQuery)).docs;

    return salesDocs[0].data();
}
