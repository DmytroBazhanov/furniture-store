import { ReactComponent as BigFilterSign } from "../../assets/BigFilterSign.svg";
import ProductFilters from "../productFilters/ProductFilters";
import Sidebar from "../sidebar/Sidebar";

import "./sideFilters.scss";

export default function SideFilters({ filters, setVisibility, visible }) {
    return (
        <>
            <Sidebar
                visible={visible}
                setVisibility={setVisibility}
                headerContent={
                    <div className="filterHeading">
                        <div className="filterSign">
                            <BigFilterSign />
                        </div>
                        <h1 className="filterHeader">Filters</h1>
                    </div>
                }
                mainContent={<ProductFilters filters={filters} />}
            />
        </>
    );
}
