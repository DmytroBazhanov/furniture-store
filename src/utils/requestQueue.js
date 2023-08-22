import { updateProfile } from "../components/profile/config";

export const addToRequestQueue = (fbaseRequestName, propsArray) => {
    const currentQueue = JSON.parse(localStorage.getItem("requestQueue"));
    if (currentQueue) {
        const duplicateIndex = currentQueue.findIndex((requestObject) => {
            return requestObject.request === fbaseRequestName;
        });

        if (duplicateIndex !== -1) {
            localStorage.setItem(
                "requestQueue",
                JSON.stringify(
                    currentQueue.map((requestObject) => {
                        if (requestObject.request === fbaseRequestName)
                            return { request: fbaseRequestName, props: propsArray };
                        else return requestObject;
                    })
                )
            );
            return;
        }

        localStorage.setItem(
            "requestQueue",
            JSON.stringify([...currentQueue, { request: fbaseRequestName, props: propsArray }])
        );
    } else {
        localStorage.setItem(
            "requestQueue",
            JSON.stringify([{ request: fbaseRequestName, props: propsArray }])
        );
    }
};

export const syncQueuedRequests = async () => {
    const requests = JSON.parse(localStorage.getItem("requestQueue"));
    if (!requests) return;

    for (let requestObj of requests) {
        await fbaseRequests[requestObj.request](...requestObj.props);
    }

    localStorage.removeItem("requestQueue");
};

export const fbaseRequests = {
    updateProfile: updateProfile,
};
