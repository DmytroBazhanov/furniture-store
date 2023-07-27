export default function ErrorMessage({ error }) {
    const errorClass = error ? "visible" : "hidden";

    return <p className={`errorMessage ${errorClass}`}>{error}</p>;
}
