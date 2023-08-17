if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/serviceWorkerFunctionality.js", {
        scope: "/",
    });
}
