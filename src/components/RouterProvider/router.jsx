import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";

import App from "../App";
import Categories from "../../pages/Categories/Categories";
import ProductListingPage from "../../pages/ProductListingPage/ProductListingPage";
import ProductDetailsPage from "../../pages/ProductDetailsPage/ProductDetailsPage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import PrivateRoute from "../privateRoute/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <h1>Error ocured</h1>, // to be done with separate errorBoundary component using useRouteError
        children: [
            {
                path: "/",
                element: <Navigate to={"/categories"} />,
            },
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
                element: <ProductDetailsPage />,
            },
            {
                path: "profile",
                element: (
                    <PrivateRoute>
                        <ProfilePage />
                    </PrivateRoute>
                ),
            },
            {
                path: "checkout",
                element: <h1>Checkout</h1>,
            },
        ],
    },
]);
