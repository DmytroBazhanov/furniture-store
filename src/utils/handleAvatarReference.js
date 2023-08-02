import { getAvatarURL } from "../queries/profile";

export default async function handleAvatarReference(UrlString) {
    if (UrlString.substring(0, 5) === "https") return UrlString;
    else {
        const avatarUrl = await getAvatarURL(UrlString);
        return avatarUrl;
    }
}
