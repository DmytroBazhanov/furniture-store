import { db } from "../firebase";
import { auth } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export async function getProfile() {
    const userID = auth.currentUser.uid;
    if (!userID) return;

    const userProfileRef = doc(db, import.meta.env.VITE_PROFILES, userID);
    const profile = await getDoc(userProfileRef);

    return profile.data();
}
