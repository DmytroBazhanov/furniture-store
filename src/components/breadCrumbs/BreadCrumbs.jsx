import { useLocation } from "react-router-dom";
import { ReactComponent as NextCrumbSign } from "../../assets/NextCrumbSign.svg";

import "./breadCrumbs.scss";
import Crumb from "./Crumb";
import React from "react";

export default function BreadCrumbs() {
    const { pathname } = useLocation();

    const crumbs = pathname.split("/").filter((str) => str !== "");

    const renderCrumbs = () => {
        return crumbs.map((path, index) => {
            if (path === "") return;

            // Creating a link for bread crumb
            let link = "";

            for (let i = 0; i <= index; i++) {
                link += `${crumbs[i]}/`;
            }

            // Splitting URL part like "bestSellers" by capital letter
            const crumbText = path.split(/(?=[A-Z])/).join(" ");

            return (
                <React.Fragment key={link}>
                    <Crumb href={link}>{crumbText}</Crumb>
                    {index === crumbs.length - 1 ? null : (
                        <p>
                            <NextCrumbSign />
                        </p>
                    )}
                </React.Fragment>
            );
        });
    };

    const firstCrumb = (
        <>
            <Crumb href="/">Home</Crumb>
            {crumbs.length > 0 ? (
                <p>
                    <NextCrumbSign />
                </p>
            ) : null}
        </>
    );

    return (
        <div className="breadCrumbs">
            {firstCrumb}
            {renderCrumbs()}
        </div>
    );
}
