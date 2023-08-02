export default function doesUserHavePassword(auth) {
    const providers = auth.currentUser.auth.currentUser.reloadUserInfo.providerUserInfo;
    const hasPassword = providers.findIndex((provider) => provider.providerId === "password");
    return hasPassword !== -1;
}
