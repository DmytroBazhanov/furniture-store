import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Categories from "../../pages/Categories/Categories";
import ProductListingPage from "../../pages/ProductListingPage/ProductListingPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <h1>Error ocured</h1>, // to be done with separate errorBoundary component using useRouteError
        children: [
            {
                path: "categories",
                element: <Categories />,
            },
            {
                path: "categories/:categoryID",
                element: <ProductListingPage />,
            },
            {
                path: "categories/:categoryID/:productID",
                element: <h1>Product page</h1>,
            },
            {
                path: "profile",
                element: <h1>Profile</h1>,
            },
            {
                path: "checkout",
                element: <h1>Checkout</h1>,
            },
        ],
    },
]);
