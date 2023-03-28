import { RouterProvider as Provider } from "react-router-dom";
import { router } from "./router";

export default function RouterProvider() {
    return <Provider router={router} fallbackElement={"Fallback loader"} />;
}
