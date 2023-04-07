import "./propertySelector.scss";

export default function PropertySelector({
    properties,
    propertyType,
    onPropertyUpdate,
    selectedValue = "",
}) {
    const propertySelector = properties?.map((propValue) => {
        if (propertyType === "colorThemes") {
            const selectedClass = selectedValue === propValue ? "selected" : "";
            const colorStyle = { backgroundColor: propValue };
            return (
                <div
                    key={propValue}
                    className={`propertyVariation ${selectedClass}`}
                    style={colorStyle}
                    onClick={(e) => {
                        onPropertyUpdate(e, { [propertyType]: propValue });
                    }}
                ></div>
            );
        }

        return (
            <div
                key={propValue}
                className="propertyVariation"
                onClick={(e) => onPropertyUpdate(e, { [propertyType]: propValue })}
            >
                {propValue}
            </div>
        );
    });

    return (
        <div className="propertySelector">
            {propertySelector}
            <div className="scrollBar"></div>
        </div>
    );
}