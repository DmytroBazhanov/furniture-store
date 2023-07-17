export default function themeColorSeparator(themes) {
    return themes.map((themeString) => {
        const strings = themeString.split(",");
        return { color: strings[0].trim(), theme: strings[1].trim() };
    });
}
