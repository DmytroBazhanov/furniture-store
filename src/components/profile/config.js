import { MESSAGE_GREEN, MESSAGE_YELLOW, NOTIFICATION_BLUE, RED } from "../../globalStyles/colors";

export const EDITABLE_FIELDS = [
    { name: "name", alias: "Name", type: "text" },
    { name: "lastname", alias: "Last name", type: "text" },
    { name: "email", alias: "Email", type: "email" },
];

export const TICKER_STATES = {
    notTriggered: { message: "You see current version of your profile!", color: NOTIFICATION_BLUE },
    inProgress: { message: null, color: null },
    saveOffline: { message: "Changes will be applied when back online!", color: MESSAGE_YELLOW },
    saveSuccess: { message: "Changes saved!", color: MESSAGE_GREEN },
    saveError: { message: "Changes was not applied due to server error", color: RED },
};

const validateEmail = (email) => {
    const regExp = new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return email.toLowerCase().match(regExp);
};

export const validationFunction = (formProperties) => {
    const errors = {};

    for (let prop in formProperties) {
        switch (prop) {
            case "email":
                const validationOutput = validateEmail(formProperties[prop]);
                if (validationOutput === null)
                    errors[prop] = "Value should be a valid email address";
                break;
            case "lastname":
            case "name":
                const value = formProperties[prop].trim();
                if (value === "") {
                    errors[prop] = "Can't be empty";
                    break;
                } else if (value.length <= 2) {
                    errors[prop] = "Value is too short";
                    break;
                }
        }
    }
    return errors;
};
