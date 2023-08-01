import { db } from "../firebase";
import { auth, storage } from "../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

export async function getProfile() {
    const userID = auth.currentUser.uid;
    if (!userID) return;

    const userProfileRef = doc(db, import.meta.env.VITE_PROFILES, userID);
    const profile = await getDoc(userProfileRef);

    const profileData = profile.data();
    if (!profileData.avatar) return profileData;

    const avatarUrl = await getAvatarURL(profileData.avatar);
    return { ...profileData, avatar: avatarUrl };
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

    await uploadBytes(avatarRef, avatarFile).catch((error) => console.log(error));
    const avatarURL = await getDownloadURL(avatarRef);

    await updateDoc(profileRef, {
        avatar: avatarURL,
    });
}

export async function getAvatarURL(path) {
    const avatarRef = ref(storage, path);
    const avatarURL = await getDownloadURL(avatarRef);

    return avatarURL;
}
