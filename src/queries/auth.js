import { auth, db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
    await signInWithPopup(auth, googleProvider).catch((error) => console.log(error));

    const user = auth.currentUser;

    const profile = await isUserProfileExist(user.uid);
    if (profile) return;

    const fullnameArray = user.displayName.split(" ");

    const email = user?.email;
    const name = fullnameArray?.[0];
    const lastname = fullnameArray?.[1];

    await createProfile(email, name, lastname).catch((error) => console.log(error));
}

export async function signOut() {
    firebaseSignOut(auth).catch((error) => console.log(error));
}

export async function isUserProfileExist(userID) {
    const profileRef = doc(db, import.meta.env.VITE_PROFILES, userID);
    const profile = await getDoc(profileRef);

    if (!profile.data()) return false;
    return true;
}

export async function createProfile(email = "", name = "", lastname = "") {
    const userID = auth.currentUser.uid;
    const profileRef = doc(db, import.meta.env.VITE_PROFILES, userID);

    setDoc(profileRef, {
        email,
        name,
        lastname,
        purchaseHistory: [],
    });
}

// to be deleted
export async function checkUser() {
    const user = auth.currentUser;
    console.log(user);
    // isUserProfileExist(user.uid);
}
