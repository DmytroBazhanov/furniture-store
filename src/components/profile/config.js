export const EDITABLE_FIELDS = [
    { name: "name", alias: "Name", type: "text" },
    { name: "lastname", alias: "Last name", type: "text" },
    { name: "email", alias: "Email", type: "email" },
];

export const TICKER_STATES = {
    notTriggered: "You see current version of your profile!",
    inProgress: null,
    saveOffline: "Changes will be applied when back online!",
    saveSuccess: "Changes saved!",
    saveError: "Changes was not applied due to server error",
};
