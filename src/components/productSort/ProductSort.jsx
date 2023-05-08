import { useState } from "react";
import { sortOptions } from "./config";
import { ReactComponent as Shevron } from "../../assets/Shevron.svg";

import DropdownMenu from "../dropdownMenu/DropdownMenu";

import "./productSort.scss";

export default function ProductSort({ getProducts }) {
    const [placeholder, setPlaceholder] = useState("Sort by");
    const [isActive, setActive] = useState(false);
    const [currentOption, setOption] = useState("");

    const handleOptionChange = async (sortOptionText, sortOptionID, sortFucntions) => {
        getProducts(sortFucntions, true);
        setPlaceholder(sortOptionText);
        setOption(sortOptionID);
        setActive(false);
    };

    const options = sortOptions.map((option) => {
        return (
            <div
                key={option.id}
                className={`productSort-option${currentOption === option.id ? "-active" : ""}`}
                onClick={() => handleOptionChange(option.text, option.id, option.sortFunctions)}
            >
                {option.text}
            </div>
        );
    });

    return (
        <DropdownMenu
            id="productSort"
            setVisible={setActive}
            isVisible={isActive}
            dropdownContent={options}
        >
            <div className="productSort">
                <span className={`productSort-placeholder${currentOption ? "-active" : ""}`}>
                    {placeholder}
                </span>
                <Shevron className={`${isActive ? "arrow-reverse" : "arrow"}`} />
            </div>
        </DropdownMenu>
    );
}
