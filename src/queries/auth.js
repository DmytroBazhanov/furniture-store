import { auth, db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updatePassword,
    updateEmail,
    signOut as firebaseSignOut,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
    const userInfo = await signInWithPopup(auth, googleProvider).catch((error) =>
        console.log(error)
    );

    const user = auth.currentUser;

    const profile = await doesUserProfileExist(user.uid);
    if (profile) return;

    const fullnameArray = user.displayName.split(" ");

    const email = user?.email;
    const name = fullnameArray?.[0];
    const lastname = fullnameArray?.[1];
    const avatar = userInfo.user.photoURL;

    await createProfile(email, name, lastname, avatar).catch((error) => console.log(error));
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

export async function createProfile(email = "", name = "", lastname = "", avatar = "") {
    const userID = auth.currentUser.uid;
    const profileRef = doc(db, import.meta.env.VITE_PROFILES, userID);

    setDoc(profileRef, {
        email,
        name,
        lastname,
        avatar,
        purchaseHistory: [],
    });
}

export async function signInWithFacebook() {
    const provider = new FacebookAuthProvider();
    const userInfo = await signInWithPopup(auth, provider).catch((error) => console.log(error));

    const user = auth.currentUser;
    if (user === null) return;

    const profileExists = await doesUserProfileExist(user.uid);

    if (!profileExists) {
        const fullnameArray = user.displayName.split(" ");

        const email = user.email;
        const name = fullnameArray?.[0];
        const lastname = fullnameArray?.[1];
        const avatar = userInfo.user.photoURL;

        createProfile(email, name, lastname, avatar).catch((error) => console.log(error));
    }

    return;
}

export async function registerUserWithEmail(email, password) {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        createProfile(email).catch((error) => console.log(error));
        return null;
    } catch (error) {
        if (error.code === "auth/email-already-in-use") return "Email already taken";
        else return "Unknown error occured";
    }
}

export async function signInWithEmail(email, password) {
    const errors = ["auth/user-not-found", "auth/wrong-password"];

    return signInWithEmailAndPassword(auth, email, password)
        .then(() => "")
        .catch((error) => {
            const errorIndex = errors.indexOf(error.code);
            if (errorIndex !== -1) return "No such combination of password and email found";
            return "Unknown error occured";
        });
}

export async function setNewPasswordForUser(user, newPassword) {
    const message = await updatePassword(user, String(newPassword))
        .then(() => {
            return { error: false, message: "Password updated" };
        })
        .catch((error) => {
            console.log(error);
            if (error.message.includes("auth/invalid-value-(password)")) {
                return { error: true, message: "Provided incorrect password" };
            } else {
                return { error: true, message: "Server error occured" };
            }
        });

    return message;
}

export async function setNewEmailForUser(newEmail) {
    const user = auth.currentUser;
    await updateEmail(user, newEmail);
}
