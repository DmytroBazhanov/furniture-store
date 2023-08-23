import "./saleBadge.scss";
import { getCurrentSale } from "../../queries/sales";
import { useEffect, useState } from "react";

export default function SaleBadge() {
    const [badgeSettings, setSettings] = useState({});

    const handleRefresh = async () => {
        const request = new Request("sales", { method: "GET" });

        caches.open("v1").then((cache) => {
            const handleRequest = () =>
                getCurrentSale().then((saleObject) => {
                    setSettings(saleObject);

                    const now = new Date().getTime();
                    const response = new Response(JSON.stringify({ saleObject, date: now }), {
                        status: 200,
                        statusText: "OK",
                    });

                    cache.put(request, response);
                });

            cache.match(request).then((cacheResponse) => {
                if (cacheResponse) {
                    const dayInMilliseconds = 86400000;
                    cacheResponse.json().then((json) => {
                        const now = new Date().getTime();
                        if (now - dayInMilliseconds > Number(json.date)) {
                            handleRequest();
                        } else {
                            setSettings(json.saleObject);
                        }
                    });
                    return cacheResponse;
                } else {
                    handleRequest();
                }
            });
        });
    };

    const style = {
        color: badgeSettings.color,
        backgroundColor: badgeSettings.backgroundColor,
    };

    const dotStyle = {
        backgroundColor: badgeSettings.color,
        boxShadow: `0px 0px 3px 1px ${badgeSettings.color}`,
    };

    useEffect(() => {
        handleRefresh();
    }, []);

    return (
        <div className="salesBadge" style={style} onClick={handleRefresh}>
            <span className="dot" style={dotStyle}></span>
            {badgeSettings.name}
        </div>
    );
}
