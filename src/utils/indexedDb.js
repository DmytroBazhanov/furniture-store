export const duplicateFbaseKeyToRealDb = () => {
    const db_request = indexedDB.open("firebaseLocalStorageBackup");
    db_request.onsuccess = (ev) => {
        const db = ev.target.result;
        const transaction = db.transaction(["firebaseLocalStorageBackup"], "readonly");
        const objectStore = transaction.objectStore("firebaseLocalStorageBackup");
        const DbResponse = objectStore.getAll();

        DbResponse.onsuccess = (ev) => {
            const FbKeyObjectBackup = ev.target.result[0];

            const fbaseDbRequest = indexedDB.open("firebaseLocalStorageDb");
            fbaseDbRequest.onsuccess = (ev) => {
                const fbaseDb = ev.target.result;
                const fbaseTransaction = fbaseDb.transaction(["firebaseLocalStorage"], "readwrite");
                const fbaseObjectStore = fbaseTransaction.objectStore("firebaseLocalStorage");
                const additionRequest = fbaseObjectStore.add(FbKeyObjectBackup);
            };
        };
    };
};

export const createFbaseBackupKey = () => {
    const db_request = indexedDB.open("firebaseLocalStorageDb");

    db_request.onsuccess = (ev) => {
        const db = ev.target.result;
        const transaction = db.transaction(["firebaseLocalStorage"], "readonly");
        const objectStore = transaction.objectStore("firebaseLocalStorage");
        const DbResponse = objectStore.getAll();
        DbResponse.onsuccess = (ev) => {
            const FbKeyObject = ev.target.result[0];

            const secondDbRequest = indexedDB.open("firebaseLocalStorageBackup");
            secondDbRequest.onupgradeneeded = (ev) => {
                const secondDb = ev.target.result;
                secondDb.createObjectStore("firebaseLocalStorageBackup", {
                    keyPath: "fbase_key",
                    autoIncrement: false,
                });
            };

            secondDbRequest.onsuccess = (ev) => {
                const secondDb = ev.target.result;
                const secondTransaction = secondDb.transaction(
                    ["firebaseLocalStorageBackup"],
                    "readwrite"
                );
                const secondObjectStore = secondTransaction.objectStore(
                    "firebaseLocalStorageBackup"
                );

                const additionRequest = secondObjectStore.add(FbKeyObject);
            };
        };

        transaction.oncomplete = () => db.close();
    };
};
