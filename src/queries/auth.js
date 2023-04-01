import { auth, db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    signOut as firebaseSignOut,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
    await signInWithPopup(auth, googleProvider).catch((error) => console.log(error));

    const user = auth.currentUser;

    const profile = await doesUserProfileExist(user.uid);
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

export async function doesUserProfileExist(userID) {
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
    // doesUserProfileExist(user.uid);
}
//

export async function signInWithFacebook() {
    const provider = new FacebookAuthProvider();
    await signInWithPopup(auth, provider).catch((error) => console.log(error));

    const user = auth.currentUser;
    if (user === null) return;

    const profileExists = await doesUserProfileExist(user.uid);

    if (!profileExists) {
        const fullnameArray = user.displayName.split(" ");

        const email = user.email;
        const name = fullnameArray?.[0];
        const lastname = fullnameArray?.[1];

        createProfile(email, name, lastname).catch((error) => console.log(error));
    }

    return;
}
