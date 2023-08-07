export default function secondsToDate(seconds, adjustValueToMobileLayout) {
    const miliseconds = Number(seconds) * 1000;
    const date = new Date(miliseconds);

    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const month = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
    const year = date.getFullYear();

    const fullDate = `${month}/${day}/${year}`;

    if (adjustValueToMobileLayout) {
        const date = fullDate.split("/");

        const editedDate = [];
        let result = [];
        date.forEach((dateChunk, index) => {
            if (index !== date.length - 1) editedDate.push(dateChunk);
            else {
                result = [editedDate.join("/"), dateChunk];
            }
        });

        return result;
    }

    return fullDate;
}
