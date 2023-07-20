import ColorContainer from "./ColorContainer";

import "./colorPicker.scss";

export default function ColorPicker({ themes, chosenColor, setColor }) {
    const renderColors = () => {
        const chosenColorHex = chosenColor ?? themes[0].color;

        return themes.map((obj) => {
            const { color, theme } = obj;
            return (
                <ColorContainer
                    key={color}
                    color={color}
                    theme={theme}
                    setColor={setColor}
                    isChosen={chosenColorHex === color}
                />
            );
        });
    };

    return (
        <div className="colorPicker">
            <h1 className="header">Color Theme:</h1>
            <div className="colorDashboard">{renderColors()}</div>
        </div>
    );
}
