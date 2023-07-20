export default function themeColorSeparator(themes) {
    if (!Array.isArray(themes)) return -1;

    return themes.map((themeString) => {
        const strings = themeString.split(",");
        return { color: strings[0].trim(), theme: strings[1].trim() };
    });
}
