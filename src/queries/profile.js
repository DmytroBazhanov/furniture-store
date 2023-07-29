import { db } from "../firebase";
import { auth, storage } from "../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

export async function getProfile() {
    const userID = auth.currentUser.uid;
    if (!userID) return;

    const userProfileRef = doc(db, import.meta.env.VITE_PROFILES, userID);
    const profile = await getDoc(userProfileRef);

    return profile.data();
}

export async function updateProfileField(fieldKey, value) {
    const userID = auth.currentUser.uid;
    const userRef = doc(db, import.meta.env.VITE_PROFILES, userID);
    updateDoc(userRef, fieldKey, value).catch((error) => console.log(error));
}

export async function changeAvatar(avatarFile) {
    const userID = auth.currentUser.uid;

    const profileRef = doc(db, import.meta.env.VITE_PROFILES, userID);
    const avatarRef = ref(storage, `${import.meta.env.VITE_STORAGE_AVATAR}/${userID}`);

    const result = await uploadBytes(avatarRef, avatarFile).catch((error) => console.log(error));
    const avatarStoragePath = result.metadata.fullPath;
    await updateDoc(profileRef, {
        avatar: avatarStoragePath,
    });
}

export async function getAvatarURL() {
    const userID = auth.currentUser.uid;
    const pathToAvatar = `${import.meta.env.VITE_STORAGE_AVATAR}/${userID}`;

    const avatarRef = ref(storage, pathToAvatar);
    const avatarURL = await getDownloadURL(avatarRef);

    return avatarURL;
}
