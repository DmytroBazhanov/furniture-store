export default function secondsToDate(seconds) {
    const miliseconds = Number(seconds) * 1000;
    const date = new Date(miliseconds);

    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const month = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
}
