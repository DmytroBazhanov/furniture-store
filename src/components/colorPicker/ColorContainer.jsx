import { LIGHT_THEME, DARK_THEME } from "./config";
import { ReactComponent as LightCheck } from "../../assets/LightCheck.svg";
import { ReactComponent as DarkCheck } from "../../assets/DarkCheck.svg";

export default function ColorContainer({ color, theme, isChosen, setColor }) {
    const renderCheckmark = () => {
        switch (theme) {
            case LIGHT_THEME:
                return <DarkCheck />;
            case DARK_THEME:
                return <LightCheck />;
        }
    };

    return (
        <div
            className={`colorContainer ${theme}`}
            style={{ backgroundColor: color }}
            onClick={() => setColor(color)}
        >
            {isChosen && renderCheckmark()}
        </div>
    );
}
